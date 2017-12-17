// rootValue.js
import AWS from 'aws-sdk';

const doc = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'ap-northeast-1'});
const queryPromise = (payload) => {
    return new Promise((resolve, reject) => {
        doc.query(payload, (error, data) => {
            if(error) { reject(error); }
            else { resolve(data); }
        });
    });
};
const scanPromise = (payload) => {
    return new Promise((resolve, reject) => {
        doc.scan(payload, (error, data) => {
            if(error) { reject(error); }
            else { resolve(data); }
        });
    });
};

class Monster {
    constructor({ id, name, englishName, level, healthPoint, basePoint, jobPoint, race, nature, size }) {
        this.id = id;
        this.name = name;
        this.englishName = englishName;
        this.level = level;
        this.healthPoint = healthPoint;
        this.basePoint = basePoint;
        this.jobPoint = jobPoint;
        this.race = race;
        this.nature = nature;
        this.size = size;
    }
}

const rootValue = {
    monster: ({ id }) => {
        const queryPayload = {
            TableName: 'ro-monster',
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeNames: { '#id': 'id', },
            ExpressionAttributeValues: { ':id': id, },
            ScanIndexForward: false,
        };
        return queryPromise(queryPayload)
        .then(response => {
            const monsters = response.Items.map(item => new Monster(item));
            return monsters[0];
        })
        .catch(error => {
            console.log('error:', error, ', queryPayload:', queryPayload);
        });
    },
    monsters: () => {
        const scanPayload = {
            TableName: 'ro-monster',
            ScanIndexForward: false,
        };
        return scanPromise(scanPayload)
        .then(response => response.Items.map(item => new Monster(item)))
        .catch(error => {
            console.log('error:', error, ', scanPayload:', scanPayload);
        });
    },
};

export { rootValue };
