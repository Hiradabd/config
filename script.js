function toggleCPUs(radio) {
    const cpuSelect = document.getElementById('cpu');
    if (radio.value === "intel") {
        cpuSelect.innerHTML = `
            <option value="" disabled selected>لطفاً یک مدل انتخاب کنید</option>
            <option value="intel i9" data-price="500" data-specs="8 هسته، 16 رشته">Intel i9 - 500$</option>
            <option value="intel i7" data-price="300" data-specs="6 هسته، 12 رشته">Intel i7 - 300$</option>
        `;
    } else if (radio.value === "amd") {
        cpuSelect.innerHTML = `
            <option value="" disabled selected>لطفاً یک مدل انتخاب کنید</option>
            <option value="amd ryzen 9" data-price="400" data-specs="12 هسته، 24 رشته">AMD Ryzen 9 - 400$</option>
            <option value="amd ryzen 7" data-price="250" data-specs="8 هسته، 16 رشته">AMD Ryzen 7 - 250$</option>
        `;
    }
    document.getElementById('cpu-select').style.display = 'block'; // نمایش لیست کشویی
}

document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpuOptions = document.querySelectorAll('input[name="cpu"]:checked');
    const cpuSelect = document.getElementById('cpu');

    const gpu = document.getElementById('gpu');
    const motherboard = document.getElementById('motherboard');
    const ram = document.getElementById('ram');
    const storage = document.getElementById('storage');

    if (cpuSelect.value === "") {
        alert("لطفاً یک مدل CPU انتخاب کنید.");
        return;
    }

    const configList = document.getElementById('configList');
    const selectedCPU = [...cpuSelect.options].find(option => option.value === cpuSelect.value);

    configList.innerHTML = `
        <li><strong>CPU:</strong> <span class="no-wrap">${selectedCPU.value} - ${selectedCPU.dataset.price}$ (${selectedCPU.dataset.specs})</span></li>
        <li><strong>GPU:</strong> <span class="no-wrap">${gpu.value} - ${gpu.options[gpu.selectedIndex].dataset.price}$ (${gpu.options[gpu.selectedIndex].dataset.specs})</span></li>
        <li><strong>Motherboard:</strong> <span class="no-wrap">${motherboard.value} - ${motherboard.options[motherboard.selectedIndex].dataset.price}$ (${motherboard.options[motherboard.selectedIndex].dataset.specs})</span></li>
        <li><strong>RAM:</strong> <span class="no-wrap">${ram.value} - ${ram.options[ram.selectedIndex].dataset.price}$ (${ram.options[ram.selectedIndex].dataset.specs})</span></li>
        <li><strong>Hard:</strong> <span class="no-wrap">${storage.value} - ${storage.options[storage.selectedIndex].dataset.price}$ (${storage.options[storage.selectedIndex].dataset.specs})</span></li>
    `;

    // محاسبه قیمت کل
    const totalPrice = parseInt(selectedCPU.dataset.price) +
                       parseInt(gpu.options[gpu.selectedIndex].dataset.price) +
                       parseInt(motherboard.options[motherboard.selectedIndex].dataset.price) +
                       parseInt(ram.options[ram.selectedIndex].dataset.price) +
                       parseInt(storage.options[storage.selectedIndex].dataset.price);

    document.getElementById('totalPrice').innerText = `قیمت کل: ${totalPrice}$`;

    // پیام سازگاری به روز شده
    const compatibilityMessage = checkCompatibility(selectedCPU.value, motherboard.value);
    document.getElementById('compatibilityMessage').innerText = compatibilityMessage;

    document.getElementById('result').style.display = 'block';
});

// تابع بررسی سازگاری بین CPU و مادربرد
function checkCompatibility(cpu, motherboard) {
    if (motherboard.includes("asus rog strix") && !cpu.includes("intel")) {
        return "توجه: مادربرد Asus ROG Strix فقط با CPU های اینتل سازگار است.";
    }
    if (motherboard.includes("msi b450") && !cpu.includes("amd")) {
        return "توجه: مادربرد MSI B450 فقط با CPU های AMD سازگار است.";
    }
    return "همه قطعات سازگارند.";
}