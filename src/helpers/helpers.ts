import { Notify } from 'quasar'

const fireNotification = (message: string, color: string): void => {
  Notify.create({
    color,
    message,
    position: 'top'
  })
}

export { fireNotification }
