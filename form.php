<?
//보내는 이
  $recipient = "himedia@hello.com";
//제목 처리
  $subject = '=?UTF-8?B?'.base64_encode($_GET['name']).'?=';
//메일주소
  $mail_from = '=?UTF-8?B?'.base64_encode($_GET['email']).'?=';

//메일내용
  $mail_body = "<table width='600' border='0' cellpadding='0' cellspacing='1' bgcolor='#CCCCCC'>
       <tr> 
          <td width='100' height='30' align='center' bgcolor='#eeeeee'>NAME</td>
          <td width='400' bgcolor='#FFFFFF'>". $_GET['name']."</td></tr>".		
       " <tr> 
          <td width='100' height='30' align='center' bgcolor='#eeeeee'>MESSAGE</td>
          <td width='400' bgcolor='#FFFFFF'>". $_GET['message']."</td></tr>".	
		  
      "</table>";

 
//메일 발송처리

  $header = "From:$subject\n";
  $header = "Content-Type: text/html;charset=UTF-8";
  $header .= "From : $mail_from <".$mail_from.">\n"; 

 
  $email = mail($recipient, $subject, $mail_body, $header);



  if (!$email)
    echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> <script>
         window.alert('메일 발송이 실패하였습니다. ');
         history.go(-1);
         </script>";
  else
    echo "         <script>
         window.alert('메일이 정상적으로 발송되었습니다.');
         history.go(-1);
         </script>";
?>

