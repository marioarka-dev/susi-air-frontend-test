import { defineStore } from 'pinia'
import mockData from '~/data/mock-flight-hours.json'
import mockDocuments from '~/data/mock-documents.json'
import mockSchedules from '~/data/mock-schedules.json'

export const usePilotStore = defineStore('pilot', {
  state: () => {
    // --- MENGOLAH DATA DOKUMEN ---
    
    const baseDate = new Date(mockDocuments.today).getTime()
    
    // Menghitung selisih hari dan menyesuaikan nama kunci (keys)
    const processedDocuments = mockDocuments.documents.map(doc => {
      const expDate = new Date(doc.expiryDate).getTime()
      const diffTime = expDate - baseDate
      const expiryDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return {
        id: doc.id,
        name: doc.label,         
        expiryDays: expiryDays   
      }
    })

    // --- MENGOLAH DATA JADWAL ---
    
    const processedSchedules = mockSchedules.schedules.map(sch => ({
      date: sch.duty_date, 
      type: sch.duty_type  
    }))

    return {
      pilotInfo: mockData.pilot,
      limits: mockData.limits,
      flightHours: mockData.flightHours,
      currentDate: '2026-05-31', 
      
      upcomingFlight: {
        date: '31 May 2026',
        time: '08:00 - 09:30',
        departure: { code: 'HLP', city: 'Jakarta' },
        arrival: { code: 'CJN', city: 'Pangandaran' }
      },
      
      
      documents: processedDocuments,
      scheduleData: processedSchedules,
      
      latestNews: [
        { id: 1, title: 'New Safety Protocols for Papuan Routes', date: '28 May 2026' },
        { id: 2, title: 'Q2 Company Townhall Meeting', date: '25 May 2026' }
      ]
    }
  },
  
  getters: {
    totalHours(state) {
      return state.flightHours.reduce((sum, record) => sum + record.hours, 0).toFixed(1)
    },
    
    currentLimits(state) {
      const getSum = (targetDateStr: string, windowDays: number) => {
        const targetDate = new Date(targetDateStr)
        const targetTime = targetDate.getTime()
        
        const startDate = new Date(targetTime)
        startDate.setDate(targetDate.getDate() - windowDays + 1)
        const startTime = startDate.getTime()

        let sum = 0
        state.flightHours.forEach(record => {
          const recordTime = new Date(record.date).getTime()
          if (recordTime >= startTime && recordTime <= targetTime) {
            sum += record.hours
          }
        })
        return parseFloat(sum.toFixed(1))
      }

      return [
        { label: 'Daily', current: getSum(state.currentDate, 1), limit: 8 },
        { label: 'Weekly', current: getSum(state.currentDate, 7), limit: 40 },
        { label: 'Monthly', current: getSum(state.currentDate, 30), limit: 100 },
        { label: 'Annual', current: getSum(state.currentDate, 365), limit: 1050 },
      ]
    }
  }
})