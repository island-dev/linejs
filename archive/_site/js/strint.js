(() => {
	function string_to_utf8_hex_string(text) {
		var bytes1 = string_to_utf8_bytes(text);
		var hex_str1 = bytes_to_hex_string(bytes1);
		return hex_str1;
	}
	function string_to_utf8_bytes(text) {
		var result = [];
		if (text == null) return result;
		for (var i = 0; i < text.length; i++) {
			var c = text.charCodeAt(i);
			if (c <= 0x7f) result.push(c);
			else if (c <= 0x07ff) {
				result.push(((c >> 6) & 0x1F) | 0xC0);
				result.push((c & 0x3F) | 0x80);
			} else {
				result.push(((c >> 12) & 0x0F) | 0xE0);
				result.push(((c >> 6) & 0x3F) | 0x80);
				result.push((c & 0x3F) | 0x80);
			}
		}
		return result;
	}
	function byte_to_hex(byte_num) {
		var digits = byte_num.toString(16);
		if (byte_num < 16) return "0" + digits;
		return digits;
	}
	function bytes_to_hex_string(bytes) {
		var result = "";
		for (var i = 0; i < bytes.length; i++) result += byte_to_hex(bytes[i]);
		return result;
	}
	function hex_to_byte(hex_str) {
		return parseInt(hex_str, 16);
	}
	function hex_string_to_bytes(hex_str) {
		var result = [];
		for (var i = 0; i < hex_str.length; i += 2) {
			result.push(hex_to_byte(hex_str.substr(i, 2)));
		}
		return result;
	}
	function enc(str) {
		let int = BigInt("0x" + string_to_utf8_hex_string(str));
		int = int * 334n;
		return base64encode(hex_string_to_bytes(int.toString(16)));
	}
	function base64encode(data) {
		return btoa([...data].map((n) => String.fromCharCode(n)).join(""));
	}
	window.enc = enc;
})();
