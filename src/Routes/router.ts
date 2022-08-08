import { createUsers, getUsers ,getUser} from './../Controllers/users';
import { Router } from "express";


const router =Router()

router.get('/',getUsers)

router.post('/', createUsers )

router.get('/:username', getUser )

router.put('/', )

export default router
