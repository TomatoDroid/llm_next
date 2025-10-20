import { Tag } from "@/app/components/base/tag-management/constant"
import { CollectionType } from "@/app/components/tools/types"
import { UploadFileSetting } from "@/app/components/workflow/types"
import { LanguagesSupported } from "@/app/i18n-config/languages"
import { AccessMode } from "@/app/models/access-control"
import { AnnotationReplyConfig, ChatPromptConfig, CompletionPromptConfig, DatasetConfigs, PromptMode } from "@/app/models/debug"

export type Language = typeof LanguagesSupported[number]

/**
 * Web Application Configuration
 */
export type SiteConfig = {
  /** Application URL Identifier: `http://dify.app/{access_token}` */
  access_token: string
  /** Public Title */
  title: string
  /** Application Description will be shown in the Client  */
  description: string
  /** Define the color in hex for different elements of the chatbot, such as:
   * The header, the button , etc.
    */
  chat_color_theme: string
  /** Invert the color of the theme set in chat_color_theme */
  chat_color_theme_inverted: boolean
  /** Author */
  author: string
  /** User Support Email Address */
  support_email: string
  /**
   * Default Language, e.g. zh-Hans, en-US
   * Use standard RFC 4646, see https://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html
   */
  default_language: Language
  /**  Custom Domain */
  customize_domain: string
  /** Theme */
  theme: string
  /** Custom Token strategy Whether Terminal Users can choose their OpenAI Key */
  customize_token_strategy: 'must' | 'allow' | 'not_allow'
  /** Is Prompt Public */
  prompt_public: boolean
  /** Web API and APP Base Domain Name */
  app_base_url: string
  /** Copyright */
  copyright: string
  /** Privacy Policy */
  privacy_policy: string
  /** Custom Disclaimer */
  custom_disclaimer: string

  icon_type: AppIconType | null
  icon: string
  icon_background: string | null
  icon_url: string | null

  show_workflow_steps: boolean
  use_icon_as_answer_icon: boolean
}

export type VisionFile = {
  id?: string
  type: string
  transfer_method: TransferMethod
  url: string
  upload_file_id: string
  belongs_to?: string
}

export enum TransferMethod {
  all = 'all',
  local_file = 'local_file',
  remote_url = 'remote_url',
}

export enum Resolution {
  low = 'low',
  high = 'high',
}


export type VisionSettings = {
  enabled: boolean
  number_limits: number
  detail: Resolution
  transfer_methods: TransferMethod[]
  image_file_size_limit?: number | string
}

export enum RETRIEVE_TYPE {
  oneWay = 'single',
  multiWay = 'multiple',
}

export type AppIconType = 'image' | 'emoji'
/**
 * App modes
 */
export const AppModes = ['advanced-chat', 'agent-chat', 'chat', 'completion', 'workflow'] as const
export type AppMode = typeof AppModes[number]

export type TextTypeFormItem = {
  default: string
  label: string
  variable: string
  required: boolean
  max_length: number
  hide: boolean
}

export type SelectTypeFormItem = {
  default: string
  label: string
  variable: string
  required: boolean
  options: string[]
  hide: boolean
}

/**
 * User Input Form Item
 */
export type UserInputFormItem = {
  'text-input': TextTypeFormItem
} | {
  select: SelectTypeFormItem
} | {
  paragraph: TextTypeFormItem
}

export enum TtsAutoPlay {
  enabled = 'enabled',
  disabled = 'disabled',
}

export enum AgentStrategy {
  functionCall = 'function_call',
  react = 'react',
}

export type ToolItem = {
  dataset: {
    enabled: boolean
    id: string
  }
} | {
  'sensitive-word-avoidance': {
    enabled: boolean
    words: string[]
    canned_response: string
  }
} | AgentTool

export type AgentTool = {
  provider_id: string
  provider_type: CollectionType
  provider_name: string
  tool_name: string
  tool_label: string
  tool_parameters: Record<string, any>
  enabled: boolean
  isDeleted?: boolean
  notAuthor?: boolean
  credential_id?: string
}
export enum ModelModeType {
  chat = 'chat',
  completion = 'completion',
  unset = '',
}
export type CompletionParams = {
  /** Maximum number of tokens in the answer message returned by Completion */
  max_tokens: number
  /**
   * A number between 0 and 2.
   * The larger the number, the more random the result;
   * otherwise, the more deterministic.
   * When in use, choose either `temperature` or `top_p`.
   * Default is 1.
   */
  temperature: number
  /**
   * Represents the proportion of probability mass samples to take,
   * e.g., 0.1 means taking the top 10% probability mass samples.
   * The determinism between the samples is basically consistent.
   * Among these results, the `top_p` probability mass results are taken.
   * When in use, choose either `temperature` or `top_p`.
   * Default is 1.
   */
  top_p: number
  /** When enabled, the Completion Text will concatenate the Prompt content together and return it. */
  echo: boolean
  /**
   * Specify up to 4 to automatically stop generating before the text specified in `stop`.
   * Suitable for use in chat mode.
   * For example, specify "Q" and "A",
   * and provide some Q&A examples as context,
   * and the model will give out in Q&A format and stop generating before Q&A.
   */
  stop: string[]
  /**
   * A number between -2.0 and 2.0.
   * The larger the value, the less the model will repeat topics and the more it will provide new topics.
   */
  presence_penalty: number
  /**
   * A number between -2.0 and 2.0.
   * A lower setting will make the model appear less cultured,
   * always repeating expressions.
   * The difference between `frequency_penalty` and `presence_penalty`
   * is that `frequency_penalty` penalizes a word based on its frequency in the training data,
   * while `presence_penalty` penalizes a word based on its occurrence in the input text.
   */
  frequency_penalty: number
}
/**
 * Model configuration. The backend type.
 */
export type Model = {
  /** LLM provider, e.g., OPENAI */
  provider: string
  /** Model name, e.g, gpt-3.5.turbo */
  name: string
  mode: ModelModeType
  /** Default Completion call parameters */
  completion_params: CompletionParams
}

export type ModelConfig = {
  opening_statement: string
  suggested_questions?: string[]
  pre_prompt: string
  prompt_type: PromptMode
  chat_prompt_config: ChatPromptConfig | {}
  completion_prompt_config: CompletionPromptConfig | {}
  user_input_form: UserInputFormItem[]
  dataset_query_variable?: string
  more_like_this: {
    enabled?: boolean
  }
  suggested_questions_after_answer: {
    enabled: boolean
  }
  speech_to_text: {
    enabled: boolean
  }
  text_to_speech: {
    enabled: boolean
    voice?: string
    language?: string
    autoPlay?: TtsAutoPlay
  }
  retriever_resource: {
    enabled: boolean
  }
  sensitive_word_avoidance: {
    enabled: boolean
  }
  annotation_reply?: AnnotationReplyConfig
  agent_mode: {
    enabled: boolean
    strategy?: AgentStrategy
    tools: ToolItem[]
  }
  model: Model
  dataset_configs: DatasetConfigs
  file_upload?: {
    image: VisionSettings
  } & UploadFileSetting
  files?: VisionFile[]
  created_at?: number
  updated_at?: number
}

/**
 * App
 */
export type App = {
  /** App ID */
  id: string
  /** Name */
  name: string
  /** Description */
  description: string
  /** Author Name */
  author_name: string;

  /**
   * Icon Type
   * @default 'emoji'
  */
  icon_type: AppIconType | null
  /** Icon, stores file ID if icon_type is 'image' */
  icon: string
  /** Icon Background, only available when icon_type is null or 'emoji' */
  icon_background: string | null
  /** Icon URL, only available when icon_type is 'image' */
  icon_url: string | null
  /** Whether to use app icon as answer icon */
  use_icon_as_answer_icon: boolean

  /** Mode */
  mode: AppMode
  /** Enable web app */
  enable_site: boolean
  /** Enable web API */
  enable_api: boolean
  /** API requests per minute, default is 60 */
  api_rpm: number
  /** API requests per hour, default is 3600 */
  api_rph: number
  /** Whether it's a demo app */
  is_demo: boolean
  /** Model configuration */
  model_config: ModelConfig
  app_model_config: ModelConfig
  /** Timestamp of creation */
  created_at: number
  /** Timestamp of update */
  updated_at: number
  /** Web Application Configuration */
  site: SiteConfig
  /** api site url */
  api_base_url: string
  tags: Tag[]
  workflow?: {
    id: string
    created_at: number
    created_by?: string
    updated_at: number
    updated_by?: string
  }
  /** access control */
  access_mode: AccessMode
  max_active_requests?: number | null
}
