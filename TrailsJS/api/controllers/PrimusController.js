'use strict'

const Controller = require('trails/controller')

/**
 * @module PrimusController
 * @description primus controller.
 */
module.exports = class PrimusController extends Controller {

  chat(req,res) {
    return res.sendFile('chat.html', {root: './public'});
  }

  group(req, res) {
    return res.sendFile('group.html', {root: './public'});
  }
}
