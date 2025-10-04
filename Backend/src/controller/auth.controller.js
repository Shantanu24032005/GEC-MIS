import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/db'

async function registerStudent(req,res) {
    const{fullname,email,password}=req.body

    const isStudentExist=await db.query(`select * from users where email=${email}`)

    if (isStudentExist) {
        return res.status(400).json({
            message:"Student already exists"
        })
    }

    const student= await db.query(``)
}