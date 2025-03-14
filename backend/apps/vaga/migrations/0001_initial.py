# Generated by Django 5.1.7 on 2025-03-10 18:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('empresa', '0001_initial'),
        ('recrutador', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vaga',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=255)),
                ('descricao', models.TextField()),
                ('salario', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tecnologias_requeridas', models.TextField()),
                ('tipo_contrato', models.CharField(max_length=255)),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='empresa.empresa')),
                ('recrutador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recrutador.recrutador')),
            ],
        ),
    ]
