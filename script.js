document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpu = document.getElementById('cpu');
    const gpu = document.getElementById('gpu');
    const motherboard = document.getElementById('motherboard');
    const ram = document.getElementById('ram');
    const storage = document.getElementById('storage');

    const configList = document.getElementById('configList');
    configList.innerHTML = `
        <li>CPU: ${cpu.value} - ${cpu.options[cpu.selectedIndex].dataset.price}$</li>
        <li>GPU: ${gpu.value} - ${gpu.options[gpu.selectedIndex].dataset.price}$</li>
        <li>مادربرد: ${motherboard.value} - ${motherboard.options[motherboard.selectedIndex].dataset.price}$</li>
        <li>رم: ${ram.value} - ${ram.options[ram.selectedIndex].dataset.price}$</li>
        <li>هارد: ${storage.value} - ${storage.options[storage.selectedIndex].dataset.price}$</li>
    `;

    // محاسبه قیمت کل
    const totalPrice = parseInt(cpu.options[cpu.selectedIndex].dataset.price) +
                       parseInt(gpu.options[gpu.selectedIndex].dataset.price) +
                       parseInt(motherboard.options[motherboard.selectedIndex].dataset.price) +
                       parseInt(ram.options[ram.selectedIndex].dataset.price) +
                       parseInt(storage.options[storage.selectedIndex].dataset.price);

    document.getElementById('totalPrice').innerText = `قیمت کل: ${totalPrice}$`;

    // پیام سازگاری
    const compatibilityMessage = checkCompatibility(cpu.value, gpu.value);
    document.getElementById('compatibilityMessage').innerText = compatibilityMessage;

    document.getElementById('result').style.display = 'block';
});

// تابع بررسی سازگاری
function checkCompatibility(cpu, gpu) {
    if (cpu.includes("intel") && gpu.includes("amd")) {
        return "توجه: CPU و GPU سازگار نیستند.";
    }
    return "همه قطعات سازگارند.";
}