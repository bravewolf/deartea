	// form validation
	function fnValidateCheck(frmObj){
		var validChk = false;
	    $(frmObj).find(':input').each(function(index){
	        var thisObj = $(this);
	        if( thisObj.data('null') == "not" ){ 
	            if( thisObj.val() == "" ){
	                alert("Please enter " + thisObj.attr('title'));
	                thisObj.focus();
	                validChk = false;
	                return false;
	            }
	        }
	        validChk = true;
	    });
	    return validChk;
	}
	// object validation
	function fnValidateCheckObjs( objArr ){
	    var validChk = false;
	    var objs = $(objArr).split(',');
	    
	    $(objs).each(function(){
	    	if( $(this).val() == '' ){
                alert("Please enter " + $(this).attr('title') );
                $(this).focus();
                validChk = false;
                return false;
	    	}
	        validChk = true;
	    });
	    return validChk;
	}	
	// 폼 객체 공백 체크 
	function fnFFChkNull(_obj, _objNm, _focus){
		var str	= $.trim(_obj.val());
		if (str == null || str == ""){
			alert("Please enter " + _objNm);
			if (_focus == "f") _obj.focus();
			else if (_focus == "s") _obj.select();

			return false;
		}else{
			return;
		}

	}

	// 폼 객체 숫자 체크 
	function fnFFChkNumber(_obj, _objNm, _focus){
		var str	= $.trim(_obj.val());

		if(/[^0123456789]/g.test(str)) {
			alert("Please enter " + _objNm);
			if (_focus == "f") _obj.focus();
			else if (_focus == "s") _obj.select();
		}else{
			return true;
		}


	}
	// 폼 객체 공백 && 숫자 체크
	function fnFFChkNullNumber(_obj, _objNm, _focus){
		var str	= $.trim(_obj.val());
		if (str == null || str == ""){
			alert("Please enter " + _objNm);
			if (_focus == "f") _obj.focus();
			else if (_focus == "s") _obj.select();

			return false;
		}else{
			if(/[^0123456789]/g.test(str)) {
				alert("Please enter " + _objNm);
				if (_focus == "f") _obj.focus();
				else if (_focus == "s") _obj.select();
			}else{
				return true;
			}

		}

	}
	// 폼 객체 공백 && 글자수 체크 
	function fnFFChkNullByte(_obj, _objNm, _focus, _maxByte){
		var str	= $.trim(_obj.val());
		if (str == null || str == ""){
			alert("Please enter " + _objNm);
			if (_focus == "f") _obj.focus();
			else if (_focus == "s") _obj.select();

			return false;
		}else{
			var chk = fnFFChkByte(_obj, _maxByte, _objNm, _focus);
			return chk;


		}

	}
	// 폼 객체 글자 수 체크 
	function fnFFChkByte(_obj, _maxByte, _objNm, _focus){
		var str	= $.trim(_obj.val());
		var str_len = str.length;

		var rbyte = 0;
		var rlen = 0;
		var one_char = "";
		var str2 = "";

		for(var i=0; i<str_len; i++){
			one_char = str.charAt(i);
			if(escape(one_char).length > 4){
				rbyte += 2;                                         //한글2Byte
			}else{
				rbyte++;                                            //영문 등 나머지 1Byte
			}

			if(rbyte <= _maxByte){
				rlen = i+1;                                          //return할 문자열 갯수
			}
		}

		if(rbyte > _maxByte){
			//alert(_objNm + "에 한글 " + ((rbyte - _maxByte) /2) + "자 / 영문 " + (rbyte - _maxByte) + "자를 초과 입력했습니다.");
			if (_focus == "f") _obj.focus();
			else if (_focus == "s") _obj.select();

			return false;
		}else{
			return;
		}

	}
	
	// 글자 입력수 체크 및 Byte 단위 체크하여 Display
	function fnChkByteDisp(_obj, _maxByte, spanId ){
		var str = _obj.value;
		var str_len = str.length;

		var rbyte = 0;
		var rlen = 0;
		var one_char = "";
		var str2 = "";

		for(var i=0; i<str_len; i++){
			one_char = str.charAt(i);
			if(escape(one_char).length > 4){
				rbyte += 2;                                         //한글2Byte
			}else{
				rbyte++;                                            //영문 등 나머지 1Byte
			}

			if(rbyte <= _maxByte){
				rlen = i+1;                                          //return할 문자열 갯수
			}
		}


		if(rbyte > _maxByte){
			//alert("한글 " + (_maxByte/2) + "자 / 영문 " + _maxByte + "자를 초과 입력할 수 없습니다.");
			str2 = str.substr(0,rlen);                                  //문자열 자르기
			_obj.value = str2;
			fnChkByteDisp(_obj, _maxByte, spanId);
		}else{
			document.getElementById(spanId).innerText = rbyte;
		}

	}

/** 이메일 주소 체크 **/
function checkEmail(email) {
	if ( email.length > 0 ){
		var re	= new RegExp("^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$", "g");
		
		if(!re.test(email)){	
			return false;	
		}		
	}
	return true;
};

//숫자만 체크
function fnOnlyNumber(loc) {
    if(/[^0123456789]/g.test(loc.value)) {
        alert("Please enter only numbers.");
        loc.value = "";
        loc.focus();
    }
}

function checkHangul(loc) {
    if(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(loc.value)) {
		$(loc).val( $(loc).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ) );
		alert("Please enter only English letters and numbers.");
	    loc.focus();
    }
}

function checkNumberReplace(o){
	var taget="0123456789";
	var val=o.value;
	var val2="";
	for(var i=0; i<val.length;i++){
		var a = val[i];
		for(var j=0; j<taget.length;j++){
			var b= taget[j];
			if(a==b){
				val2+=a;
			}
		}
	}
	o.value=val2;
}

function checkNumberReplaceMsg(o,objname){
	var check = false;
	var val=o.value;
	var val2="";
	for(var i=0; i<val.length;i++){
		var temp = val.charAt(i);		
		if(temp < '0' || temp > '9' ){
			check = true;
		}else{
			val2+=temp;
		}
	}
	if(check){
		alert("Please enter by number");
	}
	o.value=val2;
}

/** 주민등록번호 체크 **/
function checkJumin(jumin1, jumin2) {
	var re	= new RegExp("^[0-9]{6}[0-9]{7}$", "gim");

	if(!re.test(jumin1 + "" + jumin2)){	
		return false;	
	}

	if(!isValidJumin(jumin1, jumin2)){
		return false;	
	}

	return true;
};

function isValidJumin(c1, c2) {
	var yy = c1.substring(0,2);
	var mm = c1.substring(2,4);
	var dd = c1.substring(4,6);
	var gender = c2.substring(0,1);
	var ck=0;

	// 처음 7자 검사
	//alert('jumin resut first === ' + c2.substring(0,1));
	if (c1.length != 6 || c2.length != 7 || yy < 20 || mm < 1 || mm > 12 || dd < 0 || dd > 31) {
		return false;
	}

	//끝자리 검증번호 유효성 검사
	var total = c1 + c2;
	for (i=0; i < 12; i++) {
		ck  += (i%8+2)*total.substring(i, i+1);
	}
	ck = (11-(ck%11))%10;	
	if (parseInt(ck) != parseInt(total.substring(12, 13))) {
		return false;
	}

	return true;
};

/** Check Foreigner Registration Number **/
function checkForeignerJumin(str){
	var checkID = new Array(2,3,4,5,6,7,8,9,2,3,4,5);
	var juminNum = new Array(13);
	var i=0, sum=0;
	var temp=0, temp1=0, temp2=0;
	var yy="";
	
	// jumin length check
	if(str.length != 13){
		return false;
	}
	
	// jumin ASCII [0 ~ 9] check
	for(i=0;i<13;i++){
		if(str.charAt(i)<'0' || str.charAt(i)>'9') {
			return false;
		}
	}

	// foreigner jumin check
	if(str.substring(6,13) == "5000000" || str.substring(6,13) == "6000000"
		|| str.substring(6,13) == "7000000" || str.substring(6,13) == "8000000") {
		return true;
	}
	
	for(i=0;i<12;i++){
		sum += str.charAt(i) * checkID[i];
	}
	temp = sum - Math.floor(sum/11)*11;
	temp = 11-temp;
	temp = temp - Math.floor(temp/10)*10;
	
	// Age check "1999" or "2000"
	if(str.charAt(6) == '1' || str.charAt(6) == '2' || str.charAt(6) == '5' || str.charAt(6) == '6'){
		yy = "19";
	}else{
		yy = "20";
	}
	
	var year = new Date();
	
	if((parseInt(year.getYear())-parseInt(yy+str.substring(0,2))) < 0){
		return false;
	}
	
	// add check logic
	if(str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6) != '8'){
		if(temp==eval(str.charAt(12))){
			return true;
		} else {
			return false;
		}
	} else {
		if((temp + 2)%10 == eval(str.charAt(12))){
			return true;
		} else {
			return false;
		}
	}
	return false;
}

/** 전화번호 체크 **/
function checkTelephoneNumber(tel){
	var re = new RegExp("^[0-9]{2,4}\\-[0-9]{3,4}\\-[0-9]{4}$", "gim");
	
	if(!re.test(tel)){	
		return false;	
	}

	return true;
};
/** 전화번호 체크 **/
function checkHandphoneNumber(tel){
	var re = new RegExp("^[0]{1}[1]{1}[0-9]{1}\\-[0-9]{3,4}\\-[0-9]{4}$", "gim");
	
	if(!re.test(tel)){	
		return false;	
	}

	return true;
};



function checkID(id){
	var re = new RegExp("^[0-9 a-z]{4,20}$", "gm");
	var special = new RegExp ("[!@#$%\^&*()_{}|~:;',.<>?/[\\\-]", "ig");	 

	if ( special.test(id) ) {
		alert("Special characters are not available.");
		return false;
	}
	
	if(!re.test(id) ){	
		alert("The ID can be made of English lowercase letters and numbers. It can be 4 to 20 letters.");
		return false;	
	}
	


	return true;
};

function checkID2(id, cnt, cnt2){
	var re = new RegExp("^[0-9 a-z]{"+cnt+","+cnt2+"}$", "gm");
	var special = new RegExp ("[!@#$%\^&*()_{}|~:;',.<>?/[\\\-]", "ig");	 

	if ( special.test(id) ) {
		alert("You can not use this ID. Please use a different ID.");
		return false;
	}
	
	if(!re.test(id) ){	
		//alert("아이디는 영문 소문자, 숫자로  "+ cnt +"자리 이상 "+ cnt2 +"자리 이하로 등록 가능합니다.");
		return false;	
	}

	return true;
};

function checkPwd(pwd){
	var re = new RegExp("^[0-9 A-Z a-z]{8,12}$", "gim");
	
	if(!re.test(pwd)){	
		alert("(The ID) can be made of numbers and alphabets. It can be 8 to 12 letters.");
		return false;	
	}
	
	var i=1; 
	var count=0;

	while(i<pwd.length){	//연속된 4개 이상의 숫자나 문자
		if(pwd.charAt(i)== pwd.charAt(i-1)){
			count++;
			if(count>=3) {
				alert("You cannot use more than four consecutive numbers.");
				return false;
			}
		}
		else count=0;
		i++;
	}

	return true;
};

function checkPwd2(id, pwd){

	var i=1; 
	var count=0;

	while(i<pwd.length){	//연속된 4개 이상의 숫자나 문자
		if(pwd.charAt(i)== pwd.charAt(i-1)){
			count++;
			if(count>=3){
				alert("You cannot use more than four consecutive numbers.");
				return false;
			}
		}
		else count=0;
		i++;
	}

	if(pwd.indexOf(id) > -1) {
		alert("Password cannot contain text equal to ID.");
		return false;	//아이디 포함 문자열
	}

	return true;
};

function checkPwd3 (password , cnt, cnt2) {
	
	 var re = new RegExp("[a-zA-Z]","ig");
	 var num = new RegExp ("[0-9]", "ig");
	 var special = new RegExp ("[/\"\\ ]", "ig");	 
	 
	 var retVal1 = re.test(password);
	 var retVal2 = num.test(password);
	 var retVal3 = special.test(password);
	 
	 
	 if (password.indexOf("]") > -1)
		 retVal3 = true;
	 
	 if (retVal1 == false || retVal2== false || retVal3 == true )
	 {
		 alert("For passwords, please include at least two types of English, numbers, and special characters. Please enter the password in more than "+cnt+" letter(s) and less than "+cnt2+"letters.");
		 return false;
	 }
	 
	 if (password.length > cnt2 || password.length < cnt ) {
		alert ("Please enter the password in more than "+cnt+" letter(s) and less than "+cnt2+"letters.");
		return false;
	 }
	   
	 return true;
	
}

function isBlank(str){
	if(str==""){
		return true;
	}else{
		return false;
	}
};

var MaxDay = new Array();
MaxDay[0] = 31;
MaxDay[1] = 28;
MaxDay[2] = 31;
MaxDay[3] = 30;
MaxDay[4] = 31;
MaxDay[5] = 30;
MaxDay[6] = 31;
MaxDay[7] = 31;
MaxDay[8] = 30;
MaxDay[9] = 31;
MaxDay[10]= 30;
MaxDay[11]= 31;	

function checkDate(yyyy, mm ,dd){
	if(yyyy==undefined){
		yyyy = 2004; //년도가 없으면 2004년처럼 2월이 29일까지 있는 달로 셋팅 한 다음 월/일을 체크한다
	}else{
		yyyy	= Number(yyyy);
	}

	mm		= Number(mm);
	dd		= Number(dd);


	if(yyyy < 1900 || yyyy > 2100){
		return false;
	}
	if(mm < 1 || mm > 12){
		return false;	
	}

	var tmpMaxDay = MaxDay[mm-1];
	if(mm==2 && yyyy%4==0){
		tmpMaxDay ++;
	}
	
	if(dd < 1 || dd > tmpMaxDay){
		return false;	
	}

	return true;
}




//첨부파일 확장자 추출
function getFileExt(_obj){
	
	var sFilePath = $("#" + _obj).val();
	if(sFilePath != ""){
	
		if(sFilePath.indexOf('.') >= 0) {
			   exp = sFilePath.substring(sFilePath.lastIndexOf('.')+1, sFilePath.length).toLowerCase();			   
			   return exp;
		}		
	}	  
	
	return "";
}


//첨부파일 허용 확장자 체크 
function checkFileExt(_obj, allowExts){	
	if(allowExts){
		  var exts = allowExts.toLowerCase().split(",");
		  var fext = getFileExt(_obj).toLowerCase();
		  var chk  = false;
		  
		  if(fext != "" && fext.length > 0){
			  	for(var i=0 ; i < exts.length ; i++){
			    	var ext = exts[i].toLowerCase();
			    	
			    	if(fext == ext){
			     		chk =  true;
			    	}
			   	}
		  }else{
			  chk =  true;
		  }
	}
	 
	 return chk;
}

function fnFindStr( str, findStr ){
	var result = str.indexOf( findStr );
	if ( result > -1 ){
		return true;
	}else{
		return false;
	}
}
