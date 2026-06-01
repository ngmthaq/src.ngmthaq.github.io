export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
}
