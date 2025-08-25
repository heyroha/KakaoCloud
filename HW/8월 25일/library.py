class Book:
    """도서 정보를 관리하는 클래스"""
    
    def __init__(self,title,author,isbn, year):
        self.title = title #제목
        self.author = author #저자
        self.isbn = isbn #ISBN
        self.year = year #출판년도
                  

class Member:
    def __init__(self, memberId, name):
        self.id = memberId 
        self.name = name;
        self.loans = [] #도서대출 목록(ISBN기준)      
            
class Library:
    """도서 컬렉션을 관리하는 클래스"""
    def __init__(self):
        self.books = {} #책 목록
        self.stocks = {} # 책 물량
        self.members = {} #도서관 가입자
    
    def addBook(self,book, cnt = 1):
        """도서 추가"""
        if cnt <= 0:
            raise ValueError("수량은 1이상이어야 합니다.")
        if book.isbn in self.books:
            self.stocks[book.isbn] += cnt #이미 존재해 있는 도서의 경우
            return f"{book}도서가 현재 {self.stocks[book.isbn]}권입니다!"
        else: #도서가 없는 경우
            self.books[book.isbn] = book
            self.stocks[book.isbn] = cnt
            return f"{book}도서가 새롭게 추가되었습니다!"
        
        
    
    def delBook(self, isbn, cnt=None):
        """ISBN 고유번호 기준으로 도서 삭제"""
        if isbn not in self.books:
            raise KeyError("정확한 ISBN 번호를 입력해 주세요.")

        # 전체 삭제 전, 제목을 미리 보관(삭제 후에는 접근 불가)
        title = self.books[isbn].title

        if cnt is None or cnt >= self.stocks[isbn]:
            del self.books[isbn]
            del self.stocks[isbn]
            return f"'{title}'(ISBN:{isbn})가 전체 삭제되었습니다."
        else:
            if cnt <= 0:
                raise ValueError("삭제 수량은 1 이상이어야 합니다.")
            if cnt > self.stocks[isbn]:
                raise ValueError("삭제 수량이 재고보다 많습니다.")
            self.stocks[isbn] -= cnt
            return f"'{title}'(ISBN:{isbn}) 재고 {self.stocks[isbn]}권 남음"   
            
    def searchBook(self, title = None, author = None, isbn = None):
        """도서 검색"""
        if isbn:
            return [self.books[isbn] if isbn in self.books else []]
        result = list(self.books.values())
        if title:
            result = [b for b in result if title.lower() in b.title.lower()]
        if author:
            result = [b for b in result if author.lower() in b.author.lower()]
        return result
    
    def register(self, member):
        """회원 관리"""
        if member.id in self.members:
            raise ValueError("이미 등록된 회원입니다.")
        else: self.members[member.id] = member
    
    # 대출 및 반납
    def loan(self, member_id, isbn):
        if self.stocks.get(isbn, 0) > 0:
            member = self.members[member_id]
            member.loans.append(isbn)
            self.stocks[isbn] -= 1 #재고 감소

    def give_back(self, member_id, isbn):
        member = self.members[member_id]
        if isbn in member.loans:
            member.loans.remove(isbn)
            self.stocks[isbn] += 1 #재고 증가
    
    # 회원별 대출 현황
    def member_loans(self, member_id):
        member = self.members[member_id]
        return [self.books[i].title for i in member.loans]
         
    
