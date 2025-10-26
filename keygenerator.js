import { fetchStockData, fetchCryptoData, fetchWeatherData } from './dataFetcher.js'
export async function generateKey() {
  console.log('Starting generate...')
  const stocks = await fetchStockData()
  console.log('Stock Data:', stocks)
  const cryptoData = await fetchCryptoData()
  console.log('Crypto Data:', cryptoData)
  const weather = await fetchWeatherData()
  console.log('Weather Data:', weather)
  const blob = [...stocks, ...cryptoData, ...weather].join('|')
  console.log('blob for hesh:', blob)
  const enc = new TextEncoder().encode(blob)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', enc)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  console.log('Generated Key (SHA-256):', hashHex)
  return hashHex
}
