# main.py
from library import Book, Member, Library


lib = Library()

# 도서 등록
b1 = Book("Clean Code", "Robert C. Martin", "9780132350884", 2008)
b2 = Book("Effective Python", "Brett Slatkin", "9780134034287", 2015)
print(lib.addBook(b1, 2))
print(lib.addBook(b2))

#검색
m1 = Member("u01","Alice")
print(lib.register(m1))

print("검색(title='python'):", [b.title for b in lib.searchBook(title="python")])
print("검색(isbn='9780132350884'):", [b.title for b in lib.searchBook(isbn="9780132350884")])

# 대출
print(lib.loan("u01", "9780132350884"))
print("Alice 대출 목록:", lib.member_loans("u01"))

# 반납
print(lib.give_back("u01", "9780132350884"))
print("반납 후:", lib.member_loans("u01"))

# 삭제
print(lib.addBook(b1, 3))               # 재고 늘리기
print(lib.delBook("9780132350884", 2))  # 2권만 삭제
print(lib.delBook("9780132350884"))
