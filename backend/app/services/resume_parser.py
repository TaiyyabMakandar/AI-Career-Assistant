import PyPDF2
from io import BytesIO

class ResumeParserService:
    def extract_text_from_pdf(self, file_content: bytes) -> str:
        """
        Extracts plain text from PDF bytes.
        """
        try:
            reader = PyPDF2.PdfReader(BytesIO(file_content))
            text = ""
            for i in range(len(reader.pages)):
                text += reader.pages[i].extract_text()
            return text
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
            return f"Error: {e}"

resume_parser_service = ResumeParserService()
