from django.db import migrations

def criar_usuario_anonimo(apps, schema_editor):
    """Cria o usuário anônimo se não existir"""
    try:
        Usuario = apps.get_model('shareHelp', 'Usuario')
        
        usuario_anonimo, created = Usuario.objects.get_or_create(
            username='anonimo',
            defaults={
                'email': 'anonimo@sharehelp.com',
                'nome': 'Usuário Anônimo',
                'email_verificado': True,
                'is_active': True,
                'first_name': 'Anônimo',
                'last_name': 'ShareHelp'
            }
        )
        
        if created:
            print("✅ Usuário anônimo criado via migration")
        else:
            print("ℹ️ Usuário anônimo já existe")
            
    except Exception as e:
        print(f"❌ Erro na migration do usuário anônimo: {e}")

def remover_usuario_anonimo(apps, schema_editor):
    """Remove o usuário anônimo (reverso da migration)"""
    try:
        Usuario = apps.get_model('shareHelp', 'Usuario')
        Usuario.objects.filter(username='anonimo').delete()
        print("🗑️ Usuário anônimo removido")
    except Exception as e:
        print(f"❌ Erro ao remover usuário anônimo: {e}")

class Migration(migrations.Migration):
    
    dependencies = [
        ('shareHelp', '0002_alter_doacao_usuario'),  # ← Ajuste para o número da sua última migration
    ]

    operations = [
        migrations.RunPython(criar_usuario_anonimo, remover_usuario_anonimo),
    ]