export default function ContactButton() {
    return (
        <a 
            style={{
                "display": "inline-block", 
                "textDecoration": "none",
                "color": "var(--text-color)",
                "background": "var(--accent-color)",
                "padding": "10px 20px",
                "fontSize": "13px",
                "borderRadius": "5px",
                "fontWeight": "bold",
                "alignSelf": "center",
            }}
            href="mailto:98-98mail.ru" className="contact-button">
            Контакты
        </a>
    )
}