function loginHandler(){
    const userId = document.querySelector('#userId').value,
        password = document.querySelector('#password').value,
        formData = new FormData();
    
    formData.append('userId',userId);
    formData.append('password',password);
    const xhr = new XMLHttpRequest();
    xhr.open('POST','/api/login');
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.onload = () => {
        const response = xhr.responseText;
        const json = JSON.parse(xhr.responseText);

        if(json.length === 0 ){
            alert("아이디/비밀번호를 확인해주세요.");            
        }else{
            alert(`어서오세요! '${json[0].name}' 님!`);
            window.location.reload();
        }
    };
    
    const param = new Object();
    param.userId = userId;
    param.password = password;
    xhr.send(JSON.stringify(param));
}