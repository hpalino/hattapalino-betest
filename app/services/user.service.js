import UserEntity from '../models/user.entity.js';
import {clearAll, getValue, setValue} from "../util/redis.util.js";

async function getAll() {
    try {
        const keyRedis = 'ALL_USER';
        let users = await getValue(keyRedis);
        if (!users) {
            users = await UserEntity.find();
            if (!users) { users = []; }
            setValue(keyRedis, users, 10);
        } else {
            console.log('Get Data From Redis');
        }
        return [true, users];
    } catch (e) {
        return [false, e.toString()];
    }
}

async function getByAccountNumber(accNumber) {
    try {
        const keyRedis = 'ACC_NUMBER_' + accNumber;
        let user = await getValue(keyRedis);
        if (!user) {
            user = await UserEntity.findOne({ accountNumber: accNumber });
            if (!user) {
                return [false, 'Data Not Found'];
            } else {
                setValue(keyRedis, user, 10);
            }
        }
        return [true, user];
    } catch (e) {
        return [false, e.toString()];
    }
}

async function getByIdentityNumber(idNumber) {
    try {
        const keyRedis = 'IDENTITY_NUMBER_' + idNumber;
        let user = await getValue(keyRedis);
        if (!user) {
            user = await UserEntity.findOne({ identityNumber: idNumber });
            if (!user) {
                return [false, 'Data Not Found'];
            } else {
                setValue(keyRedis, user, 10);
            }
        }
        return [true, user];
    } catch (e) {
        return [false, e.toString()];
    }
}

async function create(params) {
    try {
        const users = await UserEntity.find(
            { $or: [{id: params.id}, {accountNumber: params.accountNumber}, {identityNumber: params.identityNumber}, {userName: params.userName}, {emailAddress: params.emailAddress}] }
        );

        if (users && users.length > 0) {
            return [false, 'ID or Account Number or Identity Number or User Name or Email Address already exist'];
        }

        const user = new UserEntity();
        user.id = params.id;
        user.accountNumber = params.accountNumber;
        user.identityNumber = params.identityNumber;
        user.userName = params.userName;
        user.emailAddress = params.emailAddress;

        await user.save();
        await clearAll();
        return [true, 'User Saved'];
    } catch (e) {
        return [false, e.toString()];
    }

}

async function update(id, dataUpdate) {
    try {
        const userData = await UserEntity.findOne({id: id});
        if (!userData) {
            return [false, 'User Not Found'];
        }

        const updates = [];
        if (dataUpdate.accountNumber) { updates.push({ accountNumber: dataUpdate.accountNumber }); }
        if (dataUpdate.identityNumber) { updates.push({ identityNumber: dataUpdate.identityNumber }); }
        if (dataUpdate.userName) { updates.push({ userName: dataUpdate.userName }); }
        if (dataUpdate.emailAddress) { updates.push({ emailAddress: dataUpdate.emailAddress }); }

        if (updates.length > 0) {
            const users = await UserEntity.find(
                { $and: [
                        { $or: updates },
                        { id: {$ne: id} }
                    ]}
            );

            if (users && users.length > 0) {
                return [false, 'Account Number or Identity Number or User Name or Email Address already exist'];
            }
        }

        await UserEntity.updateOne({id: id}, {'$set': dataUpdate});
        await clearAll();
        return [true, 'User Updated'];
    } catch (e) {
        return [false, e.toString()];
    }

}

async function remove(id) {
    try {
        const user = await UserEntity.findOne({id: id});
        if (!user) {
            return [false, 'ID Not Found'];
        }
        await user.remove();
        await clearAll();
        return [true, 'User Removed'];
    } catch (e) {
        return [false, e.toString()];
    }
}

export {
    getAll,
    getByAccountNumber,
    getByIdentityNumber,
    create,
    remove,
    update
};
