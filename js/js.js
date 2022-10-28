//Global Variables

let names = []
let counter = 1
let nameIndex = 0
const numberOfNames = document.getElementById('numberOfNames')

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
  newTeamNumber.innerText = 'Team ' + counter
  newTeam.appendChild(newTeamNumber)

  let x = 0
  while (x < 2) {
    const newName = document.createElement('p')
    const newIcon = document.createElement('i')
    newName.classList.add('name')
    newName.innerText = names[nameIndex]
    nameIndex++
    newTeam.appendChild(newName)
    x++
  }
  teamContainer.appendChild(newTeam)
  counter++
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
  if (names.length % 2 == 0) {
    names.sort((a, b) => 0.5 - Math.random())
    assignTeams()
  } else {
    const warning = document.querySelector('#warning')
    const button = document.querySelector('#generate-button')
    warning.style.display = 'block'
    button.innerText = 'Yes, make my teams unbalanced!'
    button.setAttribute('onclick', 'assignTeams()')
  }
}

const assignTeams = function () {
  let numberOfTeams = names.length / 2
  for (let i = 0; i < numberOfTeams; i++) {
    generateTeams()
  }
  return numberOfTeams
}

const removeTeamMember = function (event) {
  let name = event.target.id
  const list = document.querySelector('.name-list')
  const listItem = document.getElementById(name)
  names.splice(names.indexOf(name), 1)
  list.removeChild(listItem)
}
