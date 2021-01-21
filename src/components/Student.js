function Student ({ student }) {
  const listHocLai = student.hoc_lai
    .map(function (value, index) {
      return <li key={index}>{ value }</li>;
    });

  return (
    <ul>
      <li>Họ tên: { student.ho_ten }</li>
      <li>Ngày sinh: { student.ngay_sinh }</li>
      <li>Địa chỉ: { student.dia_chi }</li>
      <li>
        Tốt nghiệp: {
          student.tot_nghiep == true ?
            'Đã Tốt Nghiệp' : 'Chưa Tốt Nghiệp'
        }
      </li>
      <li>Học lại:
        <ul>
          { listHocLai }
        </ul>
      </li>
    </ul>
  );
}

export default Student;
