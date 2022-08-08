import { RequestHandler } from "express";
import { sqlConfig } from "../Config/config";
import mssql from "mssql";
import { v4 as uuidv4 } from "uuid";

export const createUsers: RequestHandler = async (req, res) => {
  try {
    const id = uuidv4();
    const { username, email } = req.body as { username: string; email: string };
    const pool = await mssql.connect(sqlConfig);
    if (pool.connected) {
      console.log("Connected");
    }
    await pool
    .request()
    .input("id",mssql.VarChar,id)
    .input("username", mssql.VarChar,username)
    .input("email",mssql.VarChar,email)
    .execute('createUsers')

    console.log(req.body);

    res.json({ message: "succesfully inserted" });
  } catch (error) {
    res.json({ error });
  }
};


export const getUsers:RequestHandler=async(req,res)=>{
    try {

        const pool = await mssql.connect(sqlConfig)
        const users = await pool.request().execute('getUsers')

        const {recordset}= users
        res.json(recordset)
        
    } catch (error) {
        
    }

}


export const getUser:RequestHandler<{username:string}>=async(req,res)=>{
    try {
        const username =req.params.username

        const pool = await mssql.connect(sqlConfig)
        const users = await pool
        .request()
        .input('username',mssql.VarChar,username)
        .execute('getUser')

        const {recordset}= users

        if(!users.recordset[0]){
            res.json({message:'user not found'})

        }else{

        }
        res.json(recordset)
        
    } catch (error) {
        
    }

}