'use client'

export default function Home() {
  async function checkout(){
    const res = await fetch('https://strapi-6-wn0l.onrender.com/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({items: [1,2]})
    })
    const data = await res.json()
    window.location.href = data.url
  }
  return <>
    <button onClick={checkout}>ez</button>
  </>
}
