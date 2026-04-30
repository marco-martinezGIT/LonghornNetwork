// Deep clone students so original test data is not mutated
export function cloneStudents(students) {
  return students.map(s => ({
    ...s,
    roommatePreferences: [...s.roommatePreferences],
    previousInternships: [...s.previousInternships],
    roommate: null,
    friendList: [],
    chatHistory: {}
  }))
}

export function calculateConnectionStrength(a, b) {
  let strength = 0

  if (a.roommate && a.roommate === b.name) strength += 4

  for (const internship of a.previousInternships) {
    if (internship !== 'None' && b.previousInternships.includes(internship)) {
      strength += 3
    }
  }

  if (a.major && a.major === b.major) strength += 2
  if (a.age === b.age) strength += 1

  return strength
}

export function assignRoommates(students) {
  const nameMap = {}
  students.forEach(s => { nameMap[s.name] = s })

  const nextProposal = {}
  students.forEach(s => { nextProposal[s.name] = 0 })

  const queue = students.filter(s => s.roommatePreferences.length > 0).slice()

  while (queue.length > 0) {
    const proposer = queue.shift()
    if (proposer.roommate !== null) continue

    const idx = nextProposal[proposer.name]
    if (idx >= proposer.roommatePreferences.length) continue

    const targetName = proposer.roommatePreferences[idx]
    nextProposal[proposer.name]++

    const target = nameMap[targetName]
    if (!target) {
      queue.push(proposer)
      continue
    }

    if (target.roommate === null) {
      proposer.roommate = target.name
      target.roommate = proposer.name
    } else {
      const currentName = target.roommate
      const rankProposer = target.roommatePreferences.indexOf(proposer.name)
      const rankCurrent = target.roommatePreferences.indexOf(currentName)

      const prefersProposer =
        rankProposer !== -1 && (rankCurrent === -1 || rankProposer < rankCurrent)

      if (prefersProposer) {
        nameMap[currentName].roommate = null
        proposer.roommate = target.name
        target.roommate = proposer.name
        queue.push(nameMap[currentName])
      } else {
        queue.push(proposer)
      }
    }
  }
}

export function buildGraph(students) {
  const graph = {}
  students.forEach(s => { graph[s.name] = [] })

  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      const a = students[i]
      const b = students[j]
      const w = calculateConnectionStrength(a, b)
      if (w > 0) {
        graph[a.name].push({ name: b.name, weight: w })
        graph[b.name].push({ name: a.name, weight: w })
      }
    }
  }
  return graph
}

export function findReferralPath(students, graph, startName, targetCompany) {
  const dist = {}
  const prev = {}
  students.forEach(s => { dist[s.name] = Infinity })
  dist[startName] = 0

  const visited = new Set()
  const pq = [{ name: startName, d: 0 }]

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d)
    const { name: currentName } = pq.shift()

    if (visited.has(currentName)) continue
    visited.add(currentName)

    const neighbors = graph[currentName] || []
    for (const { name: neighborName, weight } of neighbors) {
      const cost = Math.max(0, 10 - weight)
      const newDist = dist[currentName] + cost
      if (newDist < dist[neighborName]) {
        dist[neighborName] = newDist
        prev[neighborName] = currentName
        pq.push({ name: neighborName, d: newDist })
      }
    }
  }

  let targetName = null
  let minDist = Infinity
  for (const s of students) {
    if (s.name === startName) continue
    if (s.previousInternships.includes(targetCompany)) {
      if (dist[s.name] < minDist) {
        minDist = dist[s.name]
        targetName = s.name
      }
    }
  }

  if (!targetName || minDist === Infinity) return []

  const path = []
  let current = targetName
  while (current !== undefined) {
    path.unshift(current)
    current = prev[current]
  }
  return path
}

export function applyChats(students, chatSeed) {
  const nameMap = {}
  students.forEach(s => { nameMap[s.name] = s })

  for (const { from, to, message } of chatSeed) {
    const sender = nameMap[from]
    const receiver = nameMap[to]
    if (!sender || !receiver) continue

    const formatted = from + ': ' + message
    if (!sender.chatHistory[to]) sender.chatHistory[to] = []
    sender.chatHistory[to].push(formatted)
    if (!receiver.chatHistory[from]) receiver.chatHistory[from] = []
    receiver.chatHistory[from].push(formatted)

    if (!sender.friendList.includes(to)) sender.friendList.push(to)
    if (!receiver.friendList.includes(from)) receiver.friendList.push(from)
  }
}
