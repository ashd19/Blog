"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, BookOpen, Edit } from "lucide-react";

// Define types
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface FAQResponses {
  [key: string]: string;
}

// AI Service Class
class BlogVerseAI {
  basePrompt: string;
  conversationHistory: { role: string; content: string }[];

  constructor() {
    this.basePrompt = `You are an assistant for BlogVerse, a modern blogging platform designed to help writers create, publish, and grow their audience. Your purpose is to help bloggers navigate the platform, improve their writing, and maximize their reach.

Key Problem You're Solving:
Writers struggle to find a platform that combines beautiful design with powerful audience-building tools. Traditional blogging platforms often lack modern engagement features, while social media platforms don't support long-form content effectively.

Platform Capabilities:
- Beautiful, customizable blog themes and layouts
- Built-in audience engagement tools (comments, newsletters, subscriptions)
- SEO optimization and analytics
- Multi-format content support (articles, stories, newsletters)
- Community features and writer networking
- Monetization options (premium content, subscriptions, sponsorships)

Your Responsibilities:
1. Onboarding Assistance: Guide new writers through blog setup and theme customization
2. Writing Support: Help with formatting, content organization, and writing best practices
3. Audience Growth: Provide tips on SEO, social sharing, and reader engagement
4. Technical Help: Assist with publishing, scheduling, and platform features
5. Community Building: Explain how to connect with other writers and build readership
6. Monetization Guidance: Help set up premium content, subscriptions, and partnerships

Tone & Approach:
- Be encouraging and supportive of writers at all levels
- Focus on helping writers express their ideas effectively
- Emphasize audience connection and growth strategies
- Use clear, accessible language about writing and platform features
- Be creative in suggesting content formats and engagement techniques

Example User Queries You Might Receive:
- "How do I choose the right theme for my blog?"
- "What's the best way to format long articles?"
- "How can I increase my blog's visibility?"
- "Can I schedule posts in advance?"
- "How do I build an email newsletter?"
- "What writing style works best for different topics?"
- "How can I collaborate with other writers?"
- "What are the best practices for blog post SEO?"
VERY IMPORTANT : DO PROPER RENDERABLE FORMAT.

Remember: You're not just solving technical problems—you're helping writers overcome creative blocks, connect with audiences, and build sustainable writing practices.
`;
    this.conversationHistory = [];
  }

  // Method to call Gemini API
  async sendToGemini(userMessage: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    // if (!apiKey) {
    //   throw new Error("Gemini API key not found");
    // }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${this.basePrompt}\n\nUser: ${userMessage}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Save to history
    this.conversationHistory.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: text || "" }
    );

    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return (
      text || "Sorry, I couldn't understand that. Try rephrasing your question."
    );
  }

  // Method for FAQ responses (fallback for common questions)
  getFAQResponse(userMessage: string): string | null {
    const message = userMessage.toLowerCase();

    const faqResponses: FAQResponses = {
      "blog|create|setup|start|new":
        "To start your blog, go to your dashboard and click 'Create Blog'. Choose from our beautiful themes, customize your layout, and write your first post. You can always modify your design later!",
      "post|article|write|publish|draft":
        "Create new posts from the 'Write' section. Use our rich text editor for formatting, add images, and schedule publication dates. Don't forget to add relevant tags to help readers discover your content.",
      "seo|visibility|search|traffic|google":
        "Improve your SEO by using relevant keywords in titles and content, writing detailed meta descriptions, and using header tags properly. Our platform automatically generates SEO-friendly URLs.",
      "audience|readers|subscribers|newsletter":
        "Build your audience by enabling email subscriptions, sharing posts on social media, and engaging with comments. Consider creating a weekly newsletter to keep readers coming back.",
      "theme|design|layout|customize|appearance":
        "Customize your blog's appearance in the 'Design' settings. Choose from modern, responsive themes and adjust colors, fonts, and layouts to match your writing style.",
      "monetize|earn|money|premium|subscription":
        "You can monetize through premium content, monthly subscriptions, or sponsored posts. Set up monetization in your 'Settings' under the 'Revenue' section.",
      "format|style|writing|content|organize":
        "For better readability, use short paragraphs, subheadings, bullet points, and relevant images. Break long content into series and use engaging introductions.",
      "community|collaborate|connect|writers|network":
        "Join writing communities from the 'Discover' page to connect with other bloggers. You can collaborate on posts, share tips, and cross-promote each other's work.",
    };

    for (const [keywords, response] of Object.entries(faqResponses)) {
      const keywordList = keywords.split("|");
      if (keywordList.some((keyword) => message.includes(keyword))) {
        return response;
      }
    }

    return null; // No FAQ match found
  }

  // Main method to get AI response
  async getResponse(userMessage: string): Promise<string> {
    // First try FAQ for quick responses
    const faqResponse = this.getFAQResponse(userMessage);
    if (faqResponse) {
      return faqResponse;
    }

    return await this.sendToGemini(userMessage);

    // Fallback response if no API key
    return "Thank you for your question! For detailed assistance with your blog, please contact our support team at help@blogverse.com. They'll be happy to help you grow your audience and improve your writing.";
  }
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your BlogVerse assistant. I can help you with blog setup, writing tips, audience growth, SEO, or any questions about publishing your content. How can I help you write better today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = useRef(new BlogVerseAI());

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Get AI response
      const botResponse = await aiService.current.getResponse(currentInput);

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize for the technical difficulty. Please try again or contact help@blogverse.com for immediate assistance with your blog.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[28rem] h-[34rem] bg-white rounded-2xl shadow-2xl border-2 border-blue-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                <BookOpen size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">BlogVerse Assistant</h3>
                <p className="text-xs opacity-90">Here to help writers</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-indigo-300 text-gray-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={12} />
                    ) : (
                      <Edit size={12} />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm shadow-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-blue-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="w-6 h-6 bg-indigo-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                    <Edit size={12} />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm border border-blue-100">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-blue-200 p-3 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about blogging, SEO, or writing..."
                className="flex-1 px-3 py-2 border border-blue-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-0"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-2 border-blue-300"
        }`}
      >
        {isOpen ? <X size={50} /> : <Bot size={40} />}
      </button>
    </div>
  );
};

export default Chatbot;
