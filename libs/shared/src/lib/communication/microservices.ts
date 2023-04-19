interface Microservice {
  name: string
  groupId: string
  clientId: string
}

export const AuthMicroservice: Microservice = {
  name: 'AUTH_MICROSERVICE',
  groupId: 'auth-consumer',
  clientId: 'auth',
}

export const PaymentMicroservice: Microservice = {
  name: 'PAYMENT_MICROSERVICE',
  groupId: 'payment-consumer',
  clientId: 'payment',
}
