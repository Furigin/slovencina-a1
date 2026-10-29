# Локальный сервер без кэширования (чтобы всегда видеть свежие файлы):
#   python tools/serve.py   → http://localhost:8080
import http.server, os

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

# многопоточный сервер: браузер держит несколько соединений сразу
with http.server.ThreadingHTTPServer(("", 8080), NoCache) as httpd:
    print("http://localhost:8080")
    httpd.serve_forever()
