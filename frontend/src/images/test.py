import openpyxl
import excel2img
#wb=openpyxl.load_workbook('test.xlsx')
#sheet = wb.active
#sheet['B12'].value = 'fixed'
#wb.save('test.xlsx')
excel2img.export_img("test.xlsx","test.png","","Sheet1!C2:R60")