from playwright.sync_api import sync_playwright, expect

def test_usuarios_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Login
        page.goto("http://localhost:3000/admin/login")
        page.get_by_placeholder("ej. admin").fill("admin")
        page.get_by_placeholder("••••").fill("1234")
        page.locator("button:has-text('Ingresar al Sistema')").click()

        page.wait_for_selector("text=Centro de Análisis DOHA")

        page.evaluate("() => { if(window.next && window.next.router) { window.next.router.push('/admin/general/usuarios'); } }")
        page.wait_for_timeout(3000)

        # Check table
        print("Page url is", page.url)

        # Verify page title
        expect(page.get_by_role("heading", name="Gestión de Usuarios")).to_be_visible()

        # Click new user button
        page.locator("button:has-text('Nuevo Usuario')").click()

        # Modal is open
        expect(page.get_by_role("heading", name="Registrar Usuario")).to_be_visible()

        # Check select rol options are present
        rol_select = page.locator("select[name='rol_id']")
        expect(rol_select).to_be_visible()

        page.screenshot(path="usuarios_modal.png")

        browser.close()

if __name__ == "__main__":
    test_usuarios_page()
