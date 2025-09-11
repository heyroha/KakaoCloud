from pydantic import BaseModel

class PacktBook(BaseModel):
    id: int
    Name : str
    Publishers : str
    Isbn: str
    
class Todo(BaseModel):
    id : int
    item: str
    
    class Config:
        schema_extra = {
            "example" : {
                "id":1,
                "item": "Example Schema!"
                
            }
        }
