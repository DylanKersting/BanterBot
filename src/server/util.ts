import { Pool } from 'pg'
const pool = new Pool()

pool.connect()
 
export const query = async (sql: string) => { 
  const rows = (await pool.query(sql)).rows
  return rows
}


export const getCookie = (cname: string) => {
  const name = cname + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export const errorHandle = async(ctx, next) => {
  try {
    ctx.status = null
    await next(ctx)
  } catch (e) {
    console.log(e)
    if (!ctx.status) {
      ctx.status = 500
    }
  }
}


