from pydantic import BaseModel, EmailStr, field_validator


class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: str
    date: str


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: int
    category: str
    date: str

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, value):
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password too long (max 72 bytes)")
        if len(value) < 6:
            raise ValueError("Password too short (min 6 characters)")
        return value


class UserLogin(BaseModel):
    email: str
    password: str
