

const usersJoin = {
    userJoin: function (id: any, username: any, room: any) {
        const user = { id, username, room }
        // users.push(user)
        let joinUser: any = localStorage.getItem('joinUser');

        if (joinUser) {
            joinUser = JSON.parse(joinUser)
            joinUser.push(user)
            localStorage.setItem('joinUser', JSON.stringify(joinUser));

        } else {
            console.log('user', user)
            localStorage.setItem('joinUser', JSON.stringify([user]));

        }
        return user;
    }
}

const currentUser = {
    getCurrentUser: function (id: any) {
        let joinUser: any = localStorage.getItem('joinUser');
        joinUser = JSON.parse(joinUser)

        return joinUser.find((user: any) => user.id === id)
    }
}


exports.userJoin = usersJoin;
exports.getcurrentUser = currentUser;


