//helper functions for socket/ chatroom management
const users = [];

const addUser = ({ id, name, room }) => {
  //add user to the room
  name = name;
  room = room;

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  //remove user from the room
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id); //show if that user is in the room

const getUsersInRoom = (room) => users.filter((user) => user.room === room); //get all users in the room

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
