import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from '../utils/getData.js'

export async function handlePost(req,res){
    try{
     const parsedData = parseJSONBody(req)
     await addTransaction(data)
     sendResponse(res, 201, 'application/json', JSON.stringify(parsedData))
    }catch(err){
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
    }
}
async function addTransaction(newTransaction){
    try { 

    const transactions = await getData()
    transactions.push(newTransaction)
    const pathJSON = path.join('data', 'data.json')
    await fs.writeFile(
      pathJSON,
      JSON.stringify(transactions, null, 2),
      'utf8'
    )
  } catch (err) {
    throw new Error(err)
  }
}