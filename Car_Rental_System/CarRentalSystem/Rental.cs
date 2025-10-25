using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CarRentalSystem
{
    public partial class Rental : Form
    {
        public Rental()
        {
            InitializeComponent();
        }

        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");


        private void populate()
        {
            Con.Open();
            string query = "select * from RentalTbl";
            SqlDataAdapter da = new SqlDataAdapter(query, Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            RentalDGV.DataSource = ds.Tables[0];
            Con.Close();
        }
        private void fillcombo()
        {
            Con.Open();
            string query = "select RegNum from CarTbl where Available = '" + "Yes" + "' ";
            SqlCommand cmd = new SqlCommand(query, Con);
            SqlDataReader rdr;
            rdr = cmd.ExecuteReader();
            DataTable dt = new DataTable();
            dt.Columns.Add("RegNum" , typeof(string));
            dt.Load(rdr);
            carRegcb.ValueMember = "RegNum";
            carRegcb.DataSource = dt;
            Con.Close();
        }
        private void fillcustomer()
        {
            Con.Open();
            string query = "select Custid from CustomerTable";
            SqlCommand cmd = new SqlCommand(query, Con);
            SqlDataReader rdr;
            rdr = cmd.ExecuteReader();
            DataTable dt = new DataTable();
            dt.Columns.Add("Custid", typeof(int));
            dt.Load(rdr);
            Custcb.ValueMember = "Custid";
            Custcb.DataSource = dt;
            Con.Close();
        }
        private void fetchCustName()
        {
            Con.Open();
            string query = "select * from CustomerTable where Custid = "+ Custcb.SelectedValue.ToString()+";";
            SqlCommand cmd = new SqlCommand(query, Con);
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                CustnameTb.Text = dr["CustName"].ToString();
            }
            Con.Close();
        }
        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void Rental_Load(object sender, EventArgs e)
        {
            fillcombo();
            fillcustomer();
            populate();
        }

        private void carRegcb_SelectionChangeCommitted(object sender, EventArgs e)
        {

        }

        private void UpdateonRent()
        {
            
        Con.Open();
        string query = "update CarTbl set Available ='" + "No" + "'  where RegNum ='" + carRegcb.SelectedValue.ToString() + "';";
        SqlCommand cmd = new SqlCommand(query, Con);
        cmd.ExecuteNonQuery();
        // MessageBox.Show("Car sucessfully Updated !");
        Con.Close();
        populate();
               
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Custcb_SelectionChangeCommitted(object sender, EventArgs e)
        {
            fetchCustName();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // Add button 
          
            if (idTb.Text == " " || CustnameTb.Text == "" || FeesTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    //Con.Open();
                    //string query = "insert into RentalTbl values (" + idTb.Text + ", '" + carRegcb.SelectedValue.ToString() + "'  , '" + DateTime.Parse(rentDate.Text) + "' , '"+ DateTime.Parse(retunDate.Text) + "' , "+FeesTb.Text+ " , '" + CustnameTb.Text + "')";
                    //SqlCommand cmd = new SqlCommand(query, Con);
                    //cmd.ExecuteNonQuery();
                    //MessageBox.Show("Car sucessfully Rented !");
                    //Con.Close();
                    //populate();

                    Con.Open();
                    string query = "INSERT INTO RentalTbl (Rentid, CarReg, RentDate, ReturnDate, RentFee, CustName) VALUES (@Rentid, @CarReg, @RentDate, @ReturnDate, @RentFee, @CustName)";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.Parameters.AddWithValue("@Rentid", idTb.Text);
                    cmd.Parameters.AddWithValue("@CarReg", carRegcb.SelectedValue.ToString());
                    cmd.Parameters.AddWithValue("@RentDate", DateTime.Parse(rentDate.Text));
                    cmd.Parameters.AddWithValue("@ReturnDate", DateTime.Parse(retunDate.Text));
                    cmd.Parameters.AddWithValue("@RentFee", FeesTb.Text);
                    cmd.Parameters.AddWithValue("@CustName", CustnameTb.Text);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car successfully rented!");
                    Con.Close();
                    UpdateonRent();
                    populate();

                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // back button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            if (idTb.Text == "" || CustnameTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "UPDATE RentalTbl SET carReg = @CarReg, RentDate = @RentDate, ReturnDate = @ReturnDate, CustName = @CustName, RentFee = @RentFee WHERE Rentid = @Rentid";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.Parameters.AddWithValue("@CarReg", carRegcb.SelectedValue.ToString());
                    cmd.Parameters.AddWithValue("@RentDate", DateTime.Parse(rentDate.Text));
                    cmd.Parameters.AddWithValue("@ReturnDate", DateTime.Parse(retunDate.Text));
                    cmd.Parameters.AddWithValue("@CustName", CustnameTb.Text);
                    cmd.Parameters.AddWithValue("@RentFee", FeesTb.Text);
                    cmd.Parameters.AddWithValue("@Rentid", idTb.Text);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car successfully updated!");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void RentalDGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            idTb.Text = RentalDGV.SelectedRows[0].Cells[0].Value.ToString();
            carRegcb.SelectedValue = RentalDGV.SelectedRows[0].Cells[1].Value.ToString();
            FeesTb.Text = RentalDGV.SelectedRows[0].Cells[4].Value.ToString();
            CustnameTb.Text = RentalDGV.SelectedRows[0].Cells[5].Value.ToString();
        }

        private void label6_Click(object sender, EventArgs e)
        {

        }
        private void UpdateonRentDeleted()
        {

            Con.Open();
            string query = "update CarTbl set Available ='" + "Yes" + "'  where RegNum ='" + carRegcb.SelectedValue.ToString() + "';";
            SqlCommand cmd = new SqlCommand(query, Con);
            cmd.ExecuteNonQuery();
            // MessageBox.Show("Car sucessfully Updated !");
            Con.Close();
            populate();


        }
        private void button5_Click(object sender, EventArgs e)
        {
            // delete button 

            if (idTb.Text == " " || CustnameTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "delete from RentalTbl where Rentid = '" + idTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Deleted sucessfully !");
                    Con.Close();
                    populate();
                    UpdateonRentDeleted();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }

        }
    }
}
