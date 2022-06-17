import db from "../../models";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import sendMail from "../../helper/sendMail";
import crypto from 'crypto';
import moment from 'moment';
import { JSON } from "sequelize/dist";
const { Socket } = require("../../socket.service");

dotenv.config({ path: __dirname + "/.env" });

const Group = db["Group"];
const GroupUsers = db["GroupUsers"];

export class GroupController {
  static async addGroup(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      let data = req.body;
      if (!data) {
        throw new Error("Please fill all the required fields");
      }
      let existingGroup = await Group.findOne({
        where: {
          groupName: data.groupName
        },
      });
      if (existingGroup) {
        throw new Error("Group Name already exists");
      }
      let result = await Group.create({
        groupName: data.groupName,
        status: Number(data.status),
      });
      if (result) {
        let results = await GroupUsers.create({
          groupId: result.dataValues.id,
          user: data.user,
          role: 'superAdmin',
          isRequest: true,
        });
      }

      res.send(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async GroupList(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      const group = await Group.findAll({
        where: {
          status: 1,
        },
      });
      Socket.emitData('group-list', group)
      res.send(group);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


  static async requsetUser(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      let data = req.body;
      if (!data) {
        throw new Error("Please fill all the required fields");
      }
      let existingUser = await GroupUsers.findOne({
        where: {
          groupId: data.groupId,
          user: data.user,      
          },
      })
      if(existingUser) {
        res.send({massage:'you alreay Sent The Request'});

      }else{
        let result = await GroupUsers.create({
          groupId: data.groupId,
          user: data.user,
          role: data.role,
          isRequest: false,
        });
        if(result){
            const group = await Group.findOne({
              where: {
                id: result.dataValues.groupId
              },
            });
            if(group){
              result.dataValues.groupName = group.groupName
            }
          }
        Socket.emitData('requset-list', result)

        res.send(result);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async requstGrouopList(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      if (req.body) {
        const groups = await GroupUsers.findAll({
          where: {
            user: req.body.user
          },
        });
        if(groups && groups.length>0){
          const newData = []
          for (const item of groups) {
            const group = await Group.findOne({
              where: {
                id: item.groupId
              },
            });
            if(group){
              item.dataValues.groupName = group.groupName
            }
            newData.push(item)
          }
          res.send(newData);

        }

      }

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async acceptRequset(req: any, res: any, next: any) {
    try {
      const data = req.params;
      //Validation for all the required fields
      if (data) {
        const user = await GroupUsers.findOne({
          where: {
            id: data.id,
            isRequest:false
          },
        });
        if(user){
          let updateRequset = await GroupUsers.update({
            isRequest:true
          }, {
            where: {
              id: data.id
            }
          })
          res.send({status:'success'});

        }
        
      }

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  
  static async groupUser(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      if (req.body) {
        const group = await GroupUsers.findAll({
          where: {
            groupId: req.body.groupId,
            user:req.body.user
          },
        });
        res.send(group);

      }

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async previousChat(req: any, res: any, next: any) {
    try {
      //Validation for all the required fields
      if (req.params) {
        console.log(req.params);
        const group = await Group.findOne({
          where: {
            id: req.params.id,
          },
        });
        res.send(group);

      }

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
}





