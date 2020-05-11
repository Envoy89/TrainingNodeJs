class ChatRoomManager {
    constructor () {
        this.chatRooms = {};
        this._nextRoomId = 0;
    }

    createRoom (name) {
        let room = new ChatRoom(this._nextRoomId++, name);
        this.chatRooms[room.id] = room;
        return room;
    }

    findByName (searchSubString) {
        let lowerSearchSubString = searchSubString.toLowerCase();
        let rooms = Object.values(this.chatRooms);
        return rooms.filter(room => room.name.toLowerCase().indexOf(lowerSearchSubString) !== -1)
    }

    getById (id) {
        return this.chatRooms[id];
    }
}

class ChatRoom {
    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.messages = [];
        this._nextMessageId = 0;
    }

    postMessage (body, userName) {
        let message = new Message(this._nextMessageId++, body, userName);
        this.messages.push(message);
        return message;
    }

    toJson () {
        return {
            id: this.id,
            name: this.name
        }
    }
}

class Message {
    constructor (id, body, userName, dateTime) {
        this.id = id;
        this.body = body;
        this.userName = userName;
        this.dateTime = dateTime || new Date();
    }

    toJson() {
        return {
            id: this.id,
            body: this.body,
            userName: this.userName,
            dateTime: this.dateTime.toUTCString()
        }
    }
}

module.exports = { ChatRoomManager, ChatRoom, Message };