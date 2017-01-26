'use strict';
const debug = require('debug')('tenant-model');
const mongoose = require('mongoose');
const uuid = require ('uuid');
const Schema = mongoose.Schema;

// Need to get this from configuration
const URL = 'mongodb://localhost/cdspSecurity';
mongoose.connect(URL);

const authorizationAccessTokenSchema = new Schema({
  access_token: String
});


const AuthorizationAccessToken = mongoose.model('AuthorizationAccessToken', authorizationAccessTokenSchema);

const saveAccessToken = (token) => {
  let tokenModel = new AuthorizationAccessToken(token);

  let p = new Promise((resolve, reject) => {
    tokenModel.save((err) => {
      if(err) reject(err);
      else {
        resolve(tokenModel);
      }
    });
  });

  return p;
}

const findAccessToken = (tokenString) => {
  let p = new Promise((resolve, reject) => {
    AuthorizationAccessToken.findOne({access_token: tokenString}, (err, doc) => {
      if(err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
  return p;
}

// When successfully connected
mongoose.connection.on('connected', () => {
  debug('Mongoose default connection open to');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

exports.AuthorizationAccessToken = AuthorizationAccessToken;
exports.saveAccessToken = saveAccessToken;
exports.findAccessToken = findAccessToken;
