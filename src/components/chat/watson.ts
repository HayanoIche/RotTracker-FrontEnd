import { conectarWatson } from './formularios.js'
import type { InstanciaWatson } from './formularios.js'

interface ConfiguracaoWatson {
  integrationID: string
  region: string
  serviceInstanceID: string
  onLoad: (instancia: InstanciaWatson) => Promise<void>
}

declare global {
  interface Window {
    watsonAssistantChatOptions?: ConfiguracaoWatson
  }
}

const integrationID = import.meta.env.VITE_WATSON_INTEGRATION_ID?.trim()
const region = import.meta.env.VITE_WATSON_REGION?.trim()
const serviceInstanceID = import.meta.env.VITE_WATSON_SERVICE_INSTANCE_ID?.trim()
export const watsonConfigurado = Boolean(integrationID && region && serviceInstanceID)

let carregamento: Promise<void> | undefined

export function iniciarWatson(cliente: object): Promise<void> {
  if (carregamento) return carregamento
  if (!integrationID || !region || !serviceInstanceID) {
    return Promise.reject(new Error('Configuração do Watson incompleta.'))
  }

  carregamento = new Promise((resolve, reject) => {
    window.watsonAssistantChatOptions = {
      integrationID,
      region,
      serviceInstanceID,
      async onLoad(instancia) {
        try {
          conectarWatson(instancia, cliente)
          await instancia.render()
          resolve()
        } catch (erro) {
          reject(erro)
        }
      },
    }

    const script = document.createElement('script')
    script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js'
    script.async = true
    script.addEventListener('error', () => {
      script.remove()
      carregamento = undefined
      reject(new Error('Falha ao carregar o chat do Watson.'))
    })
    document.head.append(script)
  })
  return carregamento
}
