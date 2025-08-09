# TipTap AI Autocomplete Extension

A powerful AI-powered autocomplete and text editing extension for TipTap editor with real-time streaming preview.

## ✨ Features

### 🤖 AI Autocomplete
- **Tab-based suggestions** - Press Tab to request/accept AI completions
- **Ghost text overlay** - See suggestions as you type
- **Multiple accept keys** - Tab, Enter, or Arrow Right to accept
- **Smart positioning** - Ghost text appears exactly at cursor position

### ✏️ AI Text Editing  
- **Selection-based menu** - Select text to see editing options
- **6 transformation types**:
  - Make Longer / Shorter
  - Improve / Simplify  
  - Formalize / Casualize
- **Streaming preview dialog** - See changes in real-time before applying
- **Accept/Reject workflow** - Preview, then decide

### 🎯 Key Highlights
- **Real-time streaming** - Watch AI generate text live
- **Non-destructive editing** - Preview before applying changes
- **Professional UI** - Clean popups and smooth animations
- **Configurable prompts** - Customize AI behavior
- **TypeScript support** - Fully typed for better DX

## 📦 Installation

```bash
npm install @your-org/tiptap-ai-autocomplete
```

## 🚀 Quick Start

### Basic Setup

```typescript
import { useEditor } from '@tiptap/react'
import { AIAutocomplete, useAIAutocomplete, AIGhostOverlay } from '@your-org/tiptap-ai-autocomplete'
import { useCompletion } from '@ai-sdk/react' // or your preferred AI SDK
import StarterKit from '@tiptap/starter-kit'

function MyEditor() {
  const [editor, setEditor] = useState(null)
  
  // Set up AI completion
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/your-completion-endpoint'
  })
  
  // Initialize editor with AI extension
  const editorInstance = useEditor({
    extensions: [
      StarterKit,
      AIAutocomplete.configure({
        enabled: true,
        model: 'openrouter/auto',
        maxTokens: 60,
        temperature: 0.7
      })
    ],
    onCreate: ({ editor }) => setEditor(editor)
  })

  // Set up AI autocomplete hook
  const { pendingCompletion, ghostPosition, registerHandlers } = useAIAutocomplete({
    editor: editorInstance,
    completionProvider: { complete, completion, isLoading },
    options: { enabled: true }
  })

  // Register handlers when editor is ready
  useEffect(() => {
    if (editorInstance) {
      registerHandlers(editorInstance)
    }
  }, [editorInstance, registerHandlers])

  return (
    <div className="relative">
      <EditorContent editor={editorInstance} />
      <AIGhostOverlay 
        text={pendingCompletion}
        position={ghostPosition}
        isDark={false}
      />
    </div>
  )
}
```

### With Text Editing (Advanced)

```typescript
import { 
  AIAutocomplete, 
  useAIAutocomplete, 
  AIGhostOverlay,
  AITextBubbleMenu,
  TextTransformDialog 
} from '@your-org/tiptap-ai-autocomplete'

function AdvancedEditor() {
  // ... basic setup from above
  
  return (
    <div className="relative">
      <EditorContent editor={editorInstance} />
      
      {/* AI Autocomplete */}
      <AIGhostOverlay 
        text={pendingCompletion}
        position={ghostPosition}
        isDark={isDarkMode}
      />
      
      {/* AI Text Editing */}
      <AITextBubbleMenu editor={editorInstance} />
    </div>
  )
}
```

## 🔧 Configuration

### AIAutocomplete Extension Options

```typescript
AIAutocomplete.configure({
  enabled: true,                    // Enable/disable the extension
  acceptKeys: ['Tab', 'Enter', 'ArrowRight'], // Keys to accept suggestions
  dismissKey: 'Escape',             // Key to dismiss suggestions
  requestKey: 'Tab',                // Key to request new suggestions
  maxTokens: 60,                    // Max tokens for completions
  temperature: 0.5,                 // AI creativity (0-1)
  stopSequences: ['\n\n'],          // Stop generation at these sequences
  model: 'openrouter/auto',         // AI model to use
  promptTemplate: (text) => `...`,  // Custom prompt function
  postProcess: (text) => text.trim() // Post-process completions
})
```

### Custom Prompts

```typescript
const customPrompts = {
  autocomplete: (text: string) => `Continue this story: ${text}`,
  improve: (text: string) => `Make this text more engaging: ${text}`,
  // ... other transformations
}

AIAutocomplete.configure({
  promptTemplate: customPrompts.autocomplete
})
```

## 🌐 API Requirements

You need to implement two API endpoints:

### Autocomplete Endpoint (`/api/completion`)

```typescript
// Example with OpenRouter
export async function POST(req: Request) {
  const { prompt, model, max_tokens, temperature, stop } = await req.json()
  
  // Stream completion from your AI provider
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens,
      temperature,
      stop,
      stream: true
    })
  })

  // Return streaming response compatible with AI SDK
  return new Response(response.body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
```

### Text Transform Endpoint (`/api/text-transform`)

```typescript
// Example streaming transform endpoint
export async function POST(req: Request) {
  const { text, action, model, max_tokens, temperature } = await req.json()
  
  const prompts = {
    'make-longer': `Expand this text: "${text}"`,
    'improve': `Improve this text: "${text}"`,
    // ... other actions
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    // ... similar to above but with transform-specific prompts
    stream: true
  })

  // Return Server-Sent Events for streaming preview
  const stream = new ReadableStream({
    async start(controller) {
      // Transform OpenRouter stream to SSE format
      // Send: data: {"type": "content", "content": "..."}\n\n
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    }
  })
}
```

## 🎨 Styling

The extension uses Tailwind CSS classes. Make sure you have these in your CSS:

```css
/* Required for ghost text positioning */
.ProseMirror {
  position: relative;
}

/* Optional: Customize ghost text appearance */
.ai-ghost-overlay {
  color: #9ca3af; /* gray-400 */
  pointer-events: none;
  user-select: none;
}
```

## 📚 Examples

Check the `examples/` directory for complete implementations:
- **Basic Autocomplete** - Simple Tab-based completions
- **Advanced Editor** - Full-featured editor with text editing
- **Custom Styling** - Themed examples
- **API Integration** - Different AI provider setups

## 🛠️ Development

```bash
# Clone and install
git clone https://github.com/yourusername/tiptap-ai-autocomplete
cd tiptap-ai-autocomplete
npm install

# Development
npm run dev      # Watch mode
npm run build    # Production build
npm run lint     # Check code quality
npm test         # Run tests
```

## 📄 API Reference

### Components

- `AIAutocomplete` - Main TipTap extension
- `useAIAutocomplete` - React hook for state management
- `AIGhostOverlay` - Ghost text component
- `AITextBubbleMenu` - Selection-based editing menu
- `TextTransformDialog` - Streaming preview dialog

### Types

```typescript
interface AIAutocompleteOptions {
  enabled: boolean
  acceptKeys: string[]
  dismissKey: string
  requestKey: string
  maxTokens: number
  temperature: number
  stopSequences: string[]
  model: string
  promptTemplate: (text: string) => string
  postProcess: (text: string) => string
}

interface AICompletionProvider {
  complete: (prompt: string, options?: any) => Promise<void>
  completion: string
  isLoading: boolean
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - Excellent editor framework
- [OpenRouter](https://openrouter.ai/) - AI model routing
- [Vercel AI SDK](https://sdk.vercel.ai/) - Streaming AI integration

---

**Made with ❤️ for the TipTap community**