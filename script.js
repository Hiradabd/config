document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpu = document.getElementById('cpu');
    const gpu = document.getElementById('gpu');
    const motherboard = document.getElementById('motherboard');
    const ram = document.getElementById('ram');
    const storage = document.getElementById('storage');

    const configList = document.getElementById('configList');
    configList.innerHTML = `
        <li><strong>CPU:</strong> <span class="no-wrap">${cpu.value} - ${cpu.options[cpu.selectedIndex].dataset.price}$ (${cpu.options[cpu.selectedIndex].dataset.specs})</span></li>
        <li><strong>GPU:</strong> <span class="no-wrap">${gpu.value} - ${gpu.options[gpu.selectedIndex].dataset.price}$ (${gpu.options[gpu.selectedIndex].dataset.specs})</span></li>
        <li><strong>Motherboard:</strong> <span class="no-wrap">${motherboard.value} - ${motherboard.options[motherboard.selectedIndex].dataset.price}$ (${motherboard.options[motherboard.selectedIndex].dataset.specs})</span></li>
        <li><strong>RAM:</strong> <span class="no-wrap">${ram.value} - ${ram.options[ram.selectedIndex].dataset.price}$ (${ram.options[ram.selectedIndex].dataset.specs})</span></li>
        <li><strong>Hard:</strong> <span class="no-wrap">${storage.value} - ${storage.options[storage.selectedIndex].dataset.price}$ (${storage.options[storage.selectedIndex].dataset.specs})</span></li>
    `;

    // محاسبه قیمت کل
    const totalPrice = parseInt(cpu.options[cpu.selectedIndex].dataset.price) +
                       parseInt(gpu.options[gpu.selectedIndex].dataset.price) +
                       parseInt(motherboard.options[motherboard.selectedIndex].dataset.price) +
                       parseInt(ram.options[ram.selectedIndex].dataset.price) +
                       parseInt(storage.options[storage.selectedIndex].dataset.price);

    document.getElementById('totalPrice').innerText = `قیمت کل: ${totalPrice}$`;

    // پیام سازگاری به روز شده
    const compatibilityMessage = checkCompatibility(cpu.value, motherboard.value);
    document.getElementById('compatibilityMessage').innerText = compatibilityMessage;

    document.getElementById('result').style.display = 'block';
});

// تابع بررسی سازگاری بین CPU و مادربرد
function checkCompatibility(cpu, motherboard) {
    // که در آن می‌گوییم مادربرد ASUS ROG Strix فقط با Intel i9 سازگار است
    if (motherboard.includes("asus rog strix") && !cpu.includes("intel")) {
        return "توجه: مادربرد Asus ROG Strix فقط با CPU های اینتل سازگار است.";
    }
    // که در آن می‌گوییم مادربرد MSI B450 فقط با AMD Ryzen سازگار است
    if (motherboard.includes("msi b450") && !cpu.includes("amd")) {
        return "توجه: مادربرد MSI B450 فقط با CPU های AMD سازگار است.";
    }
    return "همه قطعات سازگارند.";
}