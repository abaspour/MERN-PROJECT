import StudentDb from "../models/student.js";
import { check, validationResult } from 'express-validator';


export const getStudents= async(req,res)=> {
    try {
      const allStudent=await StudentDb.find();
      res.status(200).json(allStudent);
    } catch (error) {
        res.status(404).json({message: error.message})
    } 
}
export const deleteStudent= async(req,res)=> {
    const id=req.params.id;
    try {
        console.log(id+" deleted")
      const allStudent=await StudentDb.findByIdAndRemove(id).exec();
      res.status(200).json(allStudent);
    } catch (error) {
        res.status(404).json({message: error.message})
    } 
}
// httpstatuses.com
export const createStudent =async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const student=req.body;
    const newStudent=new StudentDb(student);
    try {
        await newStudent.save();
        res.status(201).json(newStudent);

    } catch (error) {
        res.status(409).json({message: error.message})    
    }
}