import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
# Using Llama-3.2-1B-Instruct via HuggingFace serverless inference (chat_completion API)
MODEL_ID = "meta-llama/Llama-3.2-1B-Instruct"

class AIService:
    def __init__(self):
        """
        Deferred initialization for AI client
        """
        self._client = None

    def _get_client(self):
        """
        Lazy-loads the InferenceClient
        """
        if self._client is None:
            # Only create client when needed
            self._client = InferenceClient(token=HF_TOKEN)
        return self._client

    def generate_response(self, prompt: str, max_new_tokens: int = 500) -> str:
        """
        Generates text based on prompt using HuggingFace chat_completion API.
        """
        try:
            client = self._get_client()
            response = client.chat_completion(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a professional AI Career Assistant. Provide detailed, structured, and actionable career advice."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model=MODEL_ID,
                max_tokens=max_new_tokens,
                temperature=0.7,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in AI Service: {e}")
            return f"AI is temporarily unavailable. Error: {str(e)[:200]}. Please try again."

ai_service = AIService()
