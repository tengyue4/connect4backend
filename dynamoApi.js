'use strict'

const   AWS         =   require('aws-sdk'),
        uuidv4      =   require('uuid/v4');

AWS.config.update({ region: "ap-northeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const scanTable = function(exStartId){
    const params = {
        TableName: 'connect4'
    };
    if(exStartId){
        params.ExclusiveStartKey = {id: exStartId};
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
};


const dynamoApis = {

    saveRecord: function(name){
        const params = {
            Item: {
                id: uuidv4(),
                datetime: new Date().getTime(),
                name: name
            }, 
            TableName: "connect4"
        };

        return new Promise((resolve, reject) => {
            docClient.put(params, err => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });
        });
    },


    fetchRecords: function(lastKey, records = []){
        return scanTable(lastKey)
        .then(({Items, LastEvaluatedKey}) => {
            records = records.concat(Items);
            if(!LastEvaluatedKey){
                return records;
            }else{
                return dynamoApis.fetchRecords(LastEvaluatedKey.id, records);
            }
        });
    },


};



module.exports = dynamoApis;
