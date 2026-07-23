import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from '../utils/getData.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sendJSONResponse } from '../utils/sendJSONResponse.js'

export async function handlePost(req, res) {
  try {
    const parsedData = await parseJSONBody(req)

    await addTransaction(parsedData)

    
    sendJSONResponse(res, 201, 'application/json', JSON.stringify(parsedData))
  } catch (err) {
    
    sendJSONResponse(
      res, 
      400, 
      'application/json', 
      JSON.stringify({ error: err.message || 'Failed to process transaction' })
    )
  }
}

async function addTransaction(newTransaction) {
  try {
    const transactions = await getData()
    transactions.push(newTransaction)
    
    const pathJSON = path.join(process.cwd(), 'data', 'data.json')
    
    await fs.writeFile(
      pathJSON,
      JSON.stringify(transactions, null, 2),
      'utf8'
    )
  } catch (err) {
    throw err
  }
}