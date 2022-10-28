//Global Variables
let names = []
let teamPositions = ['1', '1', '2', '2']
let counter = 3
let nameIndex = 0
let Teamcounter = 2
let numberOfNames = document.getElementById('numberOfNames')
let teamsMade = false

numberOfNames.innerText = names.length
const addTeamMember = function () {
  //Create the new Elements, assign them values and append them to the DOM
  const list = document.querySelector('.name-list')
  const name = document.getElementById('team-member')
  const newListItem = document.createElement('li')
  const newIconEdit = document.createElement('i')
  const newIconDelete = document.createElement('i')
  newIconDelete.setAttribute('id', name.value)
  newIconDelete.setAttribute('onclick', 'removeTeamMember(event)')
  newIconDelete.classList.add('fa-solid', 'fa-x')

  newListItem.innerText = name.value
  newListItem.setAttribute('id', name.value)
  newListItem.appendChild(newIconDelete)
  list.appendChild(newListItem)
  names.push(name.value)
  numberOfNames.innerText = names.length
  if (names.length > 3) {
    const button = document.querySelector('#generate-button')
    button.style.display = 'block'
  }
  name.value = ''
}

const generateTeams = function () {
  //Create the new Elements, assign them values and append them to the DOM
  const teamContainer = document.querySelector('.team-container')
  const newTeam = document.createElement('div')
  const newTeamNumber = document.createElement('h3')

  newTeam.classList.add('team')
  newTeam.classList.add('flex-column')
  newTeam.setAttribute('id', Teamcounter)
  newTeamNumber.innerText = 'Team ' + Teamcounter
  newTeam.appendChild(newTeamNumber)

  teamContainer.appendChild(newTeam)
  counter++
}

const removeTeams = function () {
  const teamContainer = document.querySelector('.team-container')
  teamContainer.removeChild(teamContainer.lastChild)
}

const checkInput = function () {
  const name = document.getElementById('team-member')

  const duplicate = names.includes(name.value)
  if (name.value == '') {
    alert('Please enter a name')
  } else if (duplicate) {
    alert('This name already exists')
  } else {
    addTeamMember()
  }
}

const checkTeams = function () {
  if (teamsMade === false) {
    assignTeams()
    teamsMade = true
  }
  assignPlayerToTeam()
}

const assignTeams = function () {
  if (Teamcounter > 2) {
    for (let i = 0; i < Teamcounter; i++) {
      teamPositions.push(i + 1)
      teamPositions.push(i + 1)
    }
  }
  teamPositions.sort((a, b) => 0.5 - Math.random())
}

const assignPlayerToTeam = function () {
  let name = names[0]
  let team = teamPositions[0].toString()
  console.log(name)
  console.log(team)

  let teamContainer = document.getElementById(team)
  let newName = document.createElement('p')
  newName.innerText = name
  teamContainer.appendChild(newName)
  names.shift()
  teamPositions.shift()
}

const removeTeamMember = function (event) {
  let name = event.target.id
  const list = document.querySelector('.name-list')
  const listItem = document.getElementById(name)
  names.splice(names.indexOf(name), 1)
  list.removeChild(listItem)
  numberOfNames.innerText = names.length
}

const adjustTeams = function (event) {
  let action = event.target.id
  let counter = document.querySelector('#teamMembersCounter')

  if (action === 'add') {
    if (Teamcounter > names.length - 1) {
      alert('You cannot have more teams than people')
    } else {
      Teamcounter += 1
      counter.innerText = Teamcounter
      generateTeams()
    }
  } else {
    if (Teamcounter === 2) {
      alert('You cannot have less than 2 teams')
    } else {
      Teamcounter -= 1
      counter.innerText = Teamcounter
      removeTeams()
    }
  }
}
