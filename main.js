const fileInput = document.querySelector(".fileInput");
const chooseImgBtn = document.querySelector(".chooseImg");
const previewImg = document.querySelector(".previewImg img");
const filterOptions = document.querySelectorAll(".filters button");
const rotateOptions = document.querySelectorAll(".rotations button")
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const resetFilter = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".saveImg");

let brightness = 100;
let saturation = 100;
let Blur = 0;
let contrast = 100;
let inversion = 0;
let grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

function loadImg() 
{
    let file = fileInput.files[0];
    if(!file) return;

    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

function applyFilter()
{
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) blur(${Blur}px) contrast(${contrast}%) grayscale(${grayscale}%)`;
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;

    const selectedFilter = document.querySelector(".filters button.active");

    if(selectedFilter.id === "brightness")
    {
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === "saturation")
    {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === "inversion")
    {
        inversion = filterSlider.value;
    }
    else if(selectedFilter.id === "grayscale")
    {
        grayscale = filterSlider.value;
    }
    else if(selectedFilter.id === "blur")
    {
        Blur = filterSlider.value;
    }
    else if (selectedFilter.id === "contrast")
    {
        contrast = filterSlider.value;
    }

    void applyFilter();
}

filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector(".filters button.active").classList.remove("active");
        option.classList.add("active");

        filterName.innerText = option.innerText;

        if(option.id === "brightness")
        {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation")
        {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion")
        {
            filterSlider.max = "100"
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else if(option.id === "grayscale")
        {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
        else if(option.id === "contrast")
        {
            filterSlider.max = "100";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        }
        else if(option.id === "blur")
        {
            filterSlider.max = "15";
            filterSlider.value = Blur;
            filterValue.innerText = `${Blur}%`;
        }
    });
});

rotateOptions.forEach((option) => {
    option.addEventListener("click", () => {
        if(option.id === "left")
        {
            rotate -= 90;
        }
        else if(option.id === "right")
        {
            rotate += 90;
        }
        else if(option.id === "horizontal")
        {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else if(option.id === "vertical")
        {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }

        void applyFilter();
    });
});

function resetIt()
{
    brightness = 100; saturation = 100; grayscale = 0; Blur = 0; contrast = 100; inversion = 0; rotate = 0;
    filterOptions[0].click();
    void applyFilter();
}

function downloadImg()
{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) blur(${Blur}px) contrast(${contrast}%) grayscale(${grayscale}%)`;
    ctx.scale(flipHorizontal, flipVertical);
    ctx.translate(canvas.width / 2, canvas.height /2);

    if(rotate !== 0)
    {
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    let link = document.createElement("a");
    link.download = "project.png";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImg);
filterSlider.addEventListener("input", updateFilter);
resetFilter.addEventListener("click", resetIt);
saveImgBtn.addEventListener("click", downloadImg);
chooseImgBtn.addEventListener("click", () => fileInput.click());