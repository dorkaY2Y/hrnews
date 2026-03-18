# HRNEWS Task Scheduler regisztráció — egyszer futtatandó
$ps1 = "C:\Users\dorka\OneDrive\Desktop\HRNEWS\scripts\daily-update.ps1"
$arg = "-NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ps1`""

$action   = New-ScheduledTaskAction -Execute "powershell.exe" -Argument $arg
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1) -StartWhenAvailable

$triggerMorning   = New-ScheduledTaskTrigger -Daily -At "05:00"
$triggerAfternoon = New-ScheduledTaskTrigger -Daily -At "15:00"

Register-ScheduledTask -TaskName "HRNEWS Morning Update"   -Action $action -Trigger $triggerMorning   -Settings $settings -Force
Register-ScheduledTask -TaskName "HRNEWS Afternoon Update" -Action $action -Trigger $triggerAfternoon -Settings $settings -Force

Write-Host "OK - taskak regisztralva: 05:00 es 15:00"
Get-ScheduledTask -TaskName "HRNEWS*" | Select-Object TaskName, State
