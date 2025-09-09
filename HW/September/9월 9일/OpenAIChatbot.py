from openai import OpenAI
import os
import dotenv
dotenv.load_dotenv()

class OpenAIChatbot:
    def __init__(self, api_key: str, model: str = 'gpt-4o-mini'):
        # create client
        self.client = OpenAI(api_key = api_key)
        self.model = model
        self.conversation_history = []
        self.system_message = {
            'role' : "system",
            "content": "당신은 카페 주무을 받는 직원입니다. 친절하게 메뉴 추천과 주문 처리를 도와주세요."
        }
        
    def add_message(self, role: str, content: str):
        #대화 히스토리에 메세지 추가
        #대화 기록 추가 - 대화 맥락 유지용
        self.conversation_history.append({
            "role": role,
            "content": content
        })

    def get_response(self, user_message:str) -> str :
        self.add_message('user', user_message)
        messages = [self.system_message] + self.conversation_history
        
        try:
            response = self.client.chat.completions.create(
                model = self.model,
                messages = messages,
                max_tokens = 1000,
                temperature = 0.7, # 창의성 조절(높을수록 창의적)
                presence_penalty = 0.6, # 새로운 주제 언급 촉진(반복 억제)
                frequency_penalty = 0.6 # 반복구문 억제 정도. 0은 억제 x
            )        
            assistant_message = response.choices[0].message.content
            self.add_message("assistant", assistant_message)
            
            return assistant_message
        
        except Exception as e:
            return f"오류발생! 오류발생! : {str(e)}"
        
    def clear_history(self):
        self.conversation_history = []
        
    def set_system_prompt(self, prompt : str):
        self.system_message["content"] = prompt
        
api_key = os.environ.get("OPENAI_API_KEY")

chatbot = OpenAIChatbot(api_key)

chatbot.set_system_prompt(
    "당신은 카페 주문을 받는 친절한 직원입니다."
    "최대한 친절하고 깜찍하게 이모티콘을 더해 메뉴 추천과 주문 처리를 도와주세요"
    "각 문장은 내려쓰기로 깔끔하게 보이도록 해주세요"
)

user_input = "안녕하세요, 오늘의 추천 메뉴가 있나요?"
response = chatbot.get_response(user_input)
print(f"🤖CAFE BOT:{response}")
print(f"========🧋🧃☕️🧉🍵========")
user_input = "오늘은 달지 않은 음료를 원해요"
response = chatbot.get_response(user_input)
print(f"🤖CAFE BOT:{response}")